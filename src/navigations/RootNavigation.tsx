import React from 'react';
import DrawerNavigation from '@/navigations/DrawerNavigation';
import AuthNavigation from '@/navigations/AuthNavigation';
import useAuth from '@/hooks/queries/useAuth';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

const RootNavigation = () => {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
    </RetryErrorBoundary>
  );
};

export default RootNavigation;
