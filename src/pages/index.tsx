import { MendableFloatingButton } from "@mendable/search"
import { dehydrate } from "@tanstack/react-query"
import { GetStaticProps } from "next"
import MetaConfig from "src/components/MetaConfig"
import { queryKey } from "src/constants/queryKey"
import { queryClient } from "src/libs/react-query"
import { filterPosts } from "src/libs/utils/notion"
import Feed from "src/routes/Feed"
import { CONFIG } from "../../site.config"
import { getPosts } from "../apis"
import { NextPageWithLayout } from "../types"

export const getStaticProps: GetStaticProps = async () => {
  const posts = filterPosts(await getPosts())
  await queryClient.prefetchQuery(queryKey.posts(), () => posts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>
      <MendableFloatingButton
        anon_key="ae1f8925-ab24-4e1d-b6ae-9daa3ca43052"
        style={{ darkMode: true, accentColor: "#fff" }}
       icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMZ47ViuTSFdjFepSR4H64vLDHiKVVPfX_Q&usqp=CAU"
      />

      <MetaConfig {...meta} />
      <Feed />
    </>
  )
}

export default FeedPage
