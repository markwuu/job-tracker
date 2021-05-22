import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Job Tracker</title>
        <meta name="Job Tracker App for Programmers" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Dashboard Page
      </main>
      <ul>
        <li>
          <Link href="/algorithm/binary-search-tree">
            <a>Algorithm: Binary search tree</a>
          </Link>
        </li>
        <li>
          <Link href="/job/better-health">
            <a>Job: Better Health</a>
          </Link>
        </li>
        <li>
          <Link href="/project/job-tracker">
            <a>Project: Job Tracker</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
