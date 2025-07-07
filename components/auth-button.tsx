'use client';

import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { setUser, setLoading } from '../store/slices/authSlice';
import { RootState } from '../store/provider';

export function AuthButton() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(status === 'loading'));
    
    if (session?.user) {
      dispatch(setUser({
        id: session.user.email || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || undefined,
      }));
    } else {
      dispatch(setUser(null));
    }
  }, [session, status, dispatch]);

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut();
  };

  if (isLoading) {
    return (
      <Button disabled variant="outline">
        Loading...
      </Button>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      ) : (
        <Button onClick={handleSignIn}>
          <LogIn className="h-4 w-4 mr-2" />
          Sign In with Google
        </Button>
      )}
    </div>
  );
}