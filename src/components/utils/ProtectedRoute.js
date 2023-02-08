import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute(props) {
  const {
    children, loggedIn
  } = props;
  const navigate = useNavigate()
  useEffect(() => {
    if(!loggedIn) {
      navigate('/login');
    }
  });

  return children;
}

export default ProtectedRoute;