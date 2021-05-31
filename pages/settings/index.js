import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';

export default function Settings() {
  const [session, loading] = useSession();

  if( typeof window !== "undefined" && loading) return null;

  if(!session) {
    return (
      <Layout>
        <h1>You arent signed in, please sign in first</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>Settings Page</h1>
    </Layout>
  )
}
