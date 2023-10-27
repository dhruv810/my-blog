import axios from "axios";
import { useState } from "react"
import useUser from "../hooks/useUsers";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = axios.post(`/api/articles/${articleName}/comments`, {   
            postedby: name,
            text: commentText
        }, {headers});
        const updatedArticle = (await response).data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    };


    return (
        <>
            <div className="add-comment-form">
                <h3>Add a Comment</h3>
                {user && <p>You are posing as {user.email}</p>}
                <label>
                    <textarea 
                        value={commentText}
                        rows="4"
                        cols="50" 
                        onChange={e => setCommentText(e.target.value)}
                        />
                </label>
                <button onClick={addComment}>Add Comment</button>
            </div>
        </>
    )
}

export default AddCommentForm