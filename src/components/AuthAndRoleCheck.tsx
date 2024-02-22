import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { toast } from 'react-hot-toast';

// Define the expected props for the wrapped component
type WrappedComponentProps = {
  userData: any; // Assuming UserData is the type of your user data
  loading: boolean;
  // ... other props that your wrapped component expects
};

const AuthAndRoleCheck = (
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
  allowedRoles: string[]
) => {
    
  const AccessControl: React.FC = (props) => {
      interface UserData {
    message: string;
    token: string;
    user: {
      email: string;
      password: string;
      role: string;
      username: string;
      __v: number;
      _id: string;
    };
  }
    const router = useRouter();
    let  [userData, setUserData] = useState<UserData>(); // You can initialize it with an empty object
    let [loading,setLoading] = useState<boolean>(true)
    useEffect(() => {
      userData = JSON.parse(Cookies.get("userData") || "{}");
      console.log(userData);
      setUserData(userData)
      if (loading&& (!userData?.user || !allowedRoles.includes(userData.user.role))) {
          // Redirect to a restricted page or show an unauthorized message
          router.push('/login');
        }
        setLoading(false)
    }, [Cookies.get("userData"),loading,allowedRoles,router]);
    
    
    
    if (loading) {
        // Optionally, you can show a loading indicator while checking access
        return <div>Loading...</div>;
    }
    
    // Pass the userData and loading as props to the wrapped component
    return <WrappedComponent userData={userData} loading={loading} {...props} />;
  };

  return AccessControl;
};

export default AuthAndRoleCheck;
