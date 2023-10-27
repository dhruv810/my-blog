import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ error, setError ] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password != confirmPassword) {
                setError("password and confirmPassword do not match");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e)
        }
    }

    return (
        <>
        <h1>Create acoount</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Enter your email"
            value={email}
            onChange={e =>setEmail(e.target.value)} />
        <input
            placeholder="Enter password" 
            type="password"
            value={password}
            onChange={e =>setPassword(e.target.value)} />
        <input
            placeholder="Reenter password" 
            type="password"
            value={confirmPassword}
            onChange={e =>setConfirmPassword(e.target.value)} />
        <button onClick={createAccount}>Create an Account</button>
        <Link to="/create-account">Already have an account? Log in here</Link>
        </>
    )
}

export default CreateAccountPage