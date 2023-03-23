import Header from "@/views/Home/component/Header";
import "./style/index.scss"
import MySwiper from "@/component/Swiper/Swiper";
import ListInfo from "@/views/Home/component/ListInfo/ListInfo";

function Home(props) {
  const newList = [1,2,3,4]
  return (
      <>
        <div className="home_wrapper">
          <Header></Header>
          <MySwiper urlList={[1,2,3,4]} height={200}></MySwiper>
          <ListInfo newList={newList}></ListInfo>
        </div>
      </>
  );
}

export default Home;
