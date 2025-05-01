"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../styles/movie-similar.module.css";
import Link from "next/link";

export default function MovieSimilar({ similars }: { similars: any[] }) {
    // wrapperRef: 스크롤 제한 범위, 스크롤시 최대 범위 제한
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    // sliderRef: 실제로 translateX로 이동할 슬라이더 영역, wrapper 내에서 이동,
    const sliderRef = useRef<HTMLDivElement | null>(null);
    // 드래그 상태 여부 저장
    const isDragging = useRef(false);
    // 드래그 시작 시 마우스 위치
    const mousePos = useRef(0);
    // 드래그 시작 시 슬라이더의 translateX 위치, 즉 현재 이동된 슬라이더 시작값
    const startPos = useRef(0);
    // 현재 슬라이더의 translateX 위치 (상태로 관리 → 렌더링 반영)
    const [currentPos, setCurrentPos] = useState(0);
    // 이동 가능한 최대 거리 (scrollWidth - clientWidth)
    const maxScroll = useRef(0);
    // 슬라이더 너비와 wrapper 너비를 기준으로 maxScroll 계산
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const slider = sliderRef.current;
        // dom이 불러와져 wrapper와 slider가 있으면
        if (wrapper && slider) {
            // 내용 영역(padding 포함, border 제외)
            const wrapperWidth = wrapper.clientWidth;
            // 스크롤 가능 전체 너비 > clientWidth, 즉 wrapper width가 500px이고 scrollwidth가 1000px이면 가려진 500px만큼 스크롤 가능
            const sliderWidth = slider.scrollWidth;
            // 스크롤 가능한 범위
            maxScroll.current = Math.max(sliderWidth - wrapperWidth, 0);
        }
    }, [similars]);

    // 현재 이동된 스크롤값, 최대 가능 스크롤값을 최소값 ~ 최대값 사이로 값 제한하는 유틸(0~-2333)
    const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

    // 마우스를 누르면 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        // 마우스 클릭 위치
        mousePos.current = e.pageX;
        startPos.current = currentPos;

    };

    // 마우스 이동 시 슬라이더 currentPos 업데이트
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.pageX - mousePos.current;
        // 현재 시작 스크롤 범위+변화값과 -maxScroll 값중 큰 값과, 이 값과 0중 작은 값을next translate로 반환
        const nextTranslate = clamp(startPos.current + deltaX, -maxScroll.current, 0);


        setCurrentPos(nextTranslate);
    };

    // 마우스를 떼면 드래그 종료
    const handleMouseUp = () => {
        isDragging.current = false;
    };

    // 터치 시작
    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        mousePos.current = e.touches[0].pageX;
        startPos.current = currentPos;
    };

    // 터치 이동
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        //현재 터치 위치 가져와 시작 위치와의 차 구함
        const deltaX = e.touches[0].pageX - mousePos.current;
        // nextTranslate을 최소값과 최댓값 사이로 제한
        const nextTranslate = clamp(startPos.current + deltaX, -maxScroll.current, 0);
        setCurrentPos(nextTranslate);
    };


    return (
        <div className={styles.wrapper}
            ref={wrapperRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}>

            <div className={styles.slider}
                ref={sliderRef}
                style={{
                    transform: `translateX(${currentPos}px)`, // 실제 이동 위치
                    transition: isDragging.current ? "none" : "transform 0.3s ease", // 드래그 중엔 애니메이션 없음
                }}>
                    {/* todo : 관련 영화 헤드 태그 추가하기 */}
                {similars.map((similar) => (
                    <div className={styles.item} key={similar.id}>
                        <img className={styles.poster}
                            src={similar.poster_path}
                            alt={similar.title}
                            draggable={false}
                            // 이미지 기본 드래그 방지
                            onDragStart={(e) => e.preventDefault()} />
                        <h3 className={styles.average}>⭐️{similar.vote_average.toFixed(1)}</h3>
                        <p>{similar.id}</p>

                        <div className={styles.overview}>
                            <h2 className={styles.title}>{similar.original_title}</h2>
                            <p className={styles.content}>{similar.overview}</p>
                            <Link className={styles.link} href={`/movies/${similar.id}/similar`} >바로가기 &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
