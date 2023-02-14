
import useCachedResources from './useCachedResources';
import React from 'react';
import Soccer from './Soccer';


export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Soccer />
    );
  }
}