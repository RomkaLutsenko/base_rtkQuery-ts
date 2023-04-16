import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {Post} from "../models/Post";

const PostContainer = () => {
    const {data: posts} = postAPI.useFetchAllPostsQuery(100)
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()

    const handleCreate = async () => {
        const title = prompt()
        await createPost({title, body: title} as any)
    }

    const handleRemove = (post: Post) => {
        deletePost(post)
    }

    const handleUpdate = (post: Post) => {
        updatePost(post)
    }

    return (
        <div className="post__list">
            <button onClick={handleCreate}>Add post</button>
            {posts && posts.map(post =>
                <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post}/>
            )}
        </div>
    );
};

export default PostContainer;
