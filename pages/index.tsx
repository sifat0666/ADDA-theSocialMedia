import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ContentCard from "../components/ContentCard";
import NoResult from "../components/NoResult";
import { Content } from "../types";
import { BASE_URL } from "../utils";
import NProgress from "nprogress";

interface Iprops {
  content: Content[];
}

const Home: NextPage<Iprops> = ({ content }) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
      console.log("touted");
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <div className="flex flex-col h-full gap-10 ">
      {content.length ? (
        content.map((i: Content) => <ContentCard post={i} key={i._id} />)
      ) : (
        <NoResult text={"no post available"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: { content: data },
  };
};

export default Home;
