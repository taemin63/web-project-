import "./SlideBanner.css";
import { useEffect, useRef, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";

export default function SlideBanner() {
  const navigate = useNavigate()
  const handleMakeClick = () => {
  const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
    } else {
      navigate("/invitation/maker");
    }
  }

  const banners = [
    {
      id: 0,
      image: "/bannerImage/banner4.png",
      title: "진행중인 이벤트",
      desc: "청첩장 최대 30% 할인 (가상 이벤트)",
      cta1: "지금 할인받기",
      cta2: "이벤트 보기",
      link1: "/event",
      link2: "/event",
    },
    {
      id: 1,
      image: "/bannerImage/banner5.jpg",
      title: "BEST 상품",
      desc: "가장 많이 선택한 베스트 청첩장",
      cta1: "베스트 보러가기",
      cta2: "바로 제작하기",
      link1: "/best",
      link2: "/make",
    },
    {
      id: 2,
      image: "/bannerImage/banner3.jpg",
      title: "MD’s Pick",
      desc: "디자이너 추천 트렌드 컬렉션",
      cta1: "추천 디자인 보기",
      cta2: "무료로 디자인",
      link1: "/pick",
      link2: "/make",
    },
  ];
  
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const startAuto = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 2000);
  };

  const stopAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (isPaused) return;
    startAuto();

    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const onClickCTA = (link) => {
    // ✅ 라우터 아직 안 붙였을 수도 있으니, 일단 기본 이동으로 처리
    // React Router 쓴다면 navigate()로 바꾸면 됨.
    window.location.href = link;
  };

  return (
    <section
      className="slideBanner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${banner.image})` }}
          aria-hidden={index !== current}
        >
          <div className="overlay" />
          <div className="content">
            <h2 className="title">{banner.title}</h2>
            <p className="desc">{banner.desc}</p>

            <div className="ctaWrap">
              <button
                className="ctaBtn primary"
                onClick={handleMakeClick}
                type="button"
              
              >
                {banner.cta1}
              </button>
              <button
                className="ctaBtn outline"
                onClick={() => onClickCTA(banner.link2)}
                type="button"
              >
                {banner.cta2}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 인디케이터(점) */}
      <div className="dots">
        {banners.map((b, idx) => (
          <button
            key={b.id}
            className={`dot ${idx === current ? "on" : ""}`}
            onClick={(e) => {
              e.currentTarget.blur();
              setCurrent(idx);}}

            type="button"
          />
        ))}
      </div>
    </section>
  );
}
