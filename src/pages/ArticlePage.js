import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import articles from './article-content'
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentList from "../components/CommentList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from '../hooks/useUsers';
import { useNavigate } from "react-router-dom";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({upvote: 0, comments: [], canUpvote: false});
    const { canUpvote } = articleInfo;
    const {articleID} = useParams();

    const {user, isLoading} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleID}`, { headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        if (isLoading) {
            loadArticleInfo();
        }
        
    }, [isLoading, user]);

    const article = articles.find(article => article.name === articleID);
    

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleID}/upvote`,null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    };

    if (!article) {
        return <NotFoundPage/>
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvote-section">
                { user
                    ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                    : <button onClick={() => {
                        navigate('/login')
                    }}>Log in to upvote</button>
                }
                <p>This article has {articleInfo.upvote} upvotes</p>
            </div>
            {article.content.map((par, i) => (
                <p key={i}>{article.content}</p>
            ))}
            {
                user
                    ? <AddCommentForm articleName={articleID} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>
                    : <button onClick={() => {
                        navigate('/login')
                    }}>Log in to add comment</button>
            }
            <CommentList comments={articleInfo.comments} />
            
        </>
    )
}

export default ArticlePage

