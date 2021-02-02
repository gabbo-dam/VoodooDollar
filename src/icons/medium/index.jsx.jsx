import * as React from "react"

function Medium(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.372 5.74a.774.774 0 00-.253-.654L.252 2.836V2.5h5.799l4.482 9.83 3.94-9.83H20v.336l-1.597 1.53a.468.468 0 00-.177.449v11.248c-.028.17.04.343.177.448l1.56 1.53v.337h-7.844v-.336l1.616-1.569c.158-.158.158-.205.158-.447V6.934l-4.49 11.407h-.607L3.566 6.934v7.645c-.043.321.064.645.29.877l2.1 2.548v.337H0v-.337l2.1-2.548c.226-.233.326-.558.272-.877V5.74z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Medium
