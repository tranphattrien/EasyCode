import React, { useEffect, useRef, useState } from "react";

export let activeTabLineRef = useRef();
export let activeTabRef = useRef();

export default function InpageNavigation({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children
}) {
  activeTabLineRef = useRef();
  activeTabRef = useRef();
  const [inPageNavIndex, setInPageNaveIndex] = useState(defaultActiveIndex);
  const changePageState = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setInPageNaveIndex(i);
  };
  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, []);

  return (
    <>
      <div className="relative bg-white border-b-2 border-grey flex flex-nowrap overflow-x-auto mb-8">
        {routes.map((route, i) => {
          return (
            <button
              key={i}
              ref={i == defaultActiveIndex ? activeTabRef : null}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex == i ? "text-black" : "text-dark-grey ") +
                (defaultHidden.includes(route) ? " md:hidden " : " ")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}

        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
}
