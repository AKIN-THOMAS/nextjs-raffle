import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import RaffleEntrance from "../components/RaffleEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                // style={{
                //     display: "flex",
                //     justifyContent: "space-between",
                //     margin: "auto",
                //     padding: "20px 20px",
                // }}
            >
                <Header />
            </div>
            <div>
                <RaffleEntrance />
            </div>
        </div>
    )
}
