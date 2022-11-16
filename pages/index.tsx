import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ContentCard from "../components/ContentCard";
import NoResult from "../components/NoResult";
import { Content } from "../types";
import { BASE_URL } from "../utils";

interface Iprops {
  content: Content[];
}

const Home: NextPage<Iprops> = ({ content }) => {
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
