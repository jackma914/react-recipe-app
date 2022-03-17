import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  // spoonacular api의 하루 할당량을 이용후에도 사용하기 위해 local에 저장하겠습니다.
  const getPopular = async () => {
    //getItem 메소드를 이용해 데이터를 local 데이터를 가져옵니다.
    const check = localStorage.getItem("popular");
    // console.log(check);
    // local에 popular라는 키네임으로 데이터가 있다면 JSON.parse를 이용해 STRING 객체를 json 객체로 변환시켜 setPopular에 값을저장합니다.
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      // local에 데이터가 없다면 fetch를 이용해 spoonacular api 에서 json 데이터를 받아옵니다.
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?&apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();

      console.log(data.recipes);
      // JSON.stringify를 이용해 json객체를 string으로 "popular" 라는 키 네임으로 setItem을 이용해 local에 추가합니다.
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
