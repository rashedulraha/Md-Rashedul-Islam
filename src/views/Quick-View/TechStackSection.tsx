"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Real Brand SVG Icons ──────────────────────────────────── */

const BrandIcons: Record<string, { svg: React.ReactNode; color: string }> = {
  React: {
    color: "#61DAFB",
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-7 h-7">
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  "Next.js": {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 180 180" className="w-7 h-7">
        <mask id="nxm" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <circle cx="90" cy="90" r="90" fill="black" />
        <g mask="url(#nxm)">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1111V69.3L139.778 164.00C143.42 162.06 146.846 159.88 149.508 157.52Z"
            fill="white"
          />
          <rect x="115" y="54" width="12" height="72" fill="white" />
        </g>
      </svg>
    ),
  },
  TypeScript: {
    color: "#3178C6",
    svg: (
      <svg viewBox="0 0 400 400" className="w-7 h-7">
        <rect width="400" height="400" rx="50" fill="#3178C6" />
        <path
          d="M87.2 200.7V219h52.2v148.4h36.4V219h52.2v-18.2c0-10 0-18.3-.4-18.5-.3-.3-32-.4-70.6-.4l-70 .3v18.5zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 3.9 9.2 11 9.6 12.8.1.5-17.3 12.3-27.9 18.8-.4.3-2-1.4-3.6-3.8-5.2-7.4-10.5-10.6-18.8-11.2-12.1-.8-19.9 5.5-19.8 16 0 3 .4 4.9 1.4 7.3 2.2 5.1 6.3 8.2 19.1 14.4 23.6 10.2 33.7 16.9 39.9 26.5 7 10.8 8.5 28.1 3.8 41-5.2 14.1-18 23.7-36.2 27-5.6 1-19.3 1.2-25.5.4-13.4-2-26.2-7.8-34.1-15.7-3.7-3.8-10.9-14.2-10.5-15s17.6-11.2 28.3-17.4l.5 1.5c1.7 4 5.5 8.6 9.5 11.2 8.9 5.5 21.2 4.9 27.2-1.2 2.7-2.7 3.6-5.4 3.6-9.8 0-4.6-.6-6.6-3-9.7-3.1-4-9.4-7.3-27.3-15.7-20.5-9.4-29.3-15.3-35.6-24.6-3.5-5.3-7-13.4-8.3-19.9-1.2-6.1-1-21.9.5-28 4.7-19.9 20.2-33.5 41.3-37 7-1.2 23.3-1 30 .4z"
          fill="white"
        />
      </svg>
    ),
  },
  "Tailwind CSS": {
    color: "#06B6D4",
    svg: (
      <svg viewBox="0 0 248 31" className="w-7 h-4">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.804-1.941-.482-3.329-1.882-4.864-3.431-2.502-2.525-5.398-5.446-11.722-5.446z"
          fill="#06B6D4"
        />
      </svg>
    ),
  },
  "Node.js": {
    color: "#339933",
    svg: (
      <svg viewBox="0 0 256 289" className="w-7 h-7">
        <path
          d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.058c1.06-.53 1.59-1.59 1.59-2.915V83.398c0-1.325-.53-2.385-1.59-2.915L128.53 19.425c-1.06-.53-2.385-.53-3.18 0L19.61 80.483c-1.06.53-1.59 1.856-1.59 2.915v121.851c0 1.06.53 2.385 1.59 2.915l28.887 16.696c15.635 7.95 25.44-1.325 25.44-10.6V93.733c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18V213.26c0 20.936-11.396 32.861-31.272 32.861-6.095 0-10.865 0-24.38-6.625L9.54 222.8C3.71 219.355 0 213.26 0 206.635V84.723c0-6.625 3.71-12.72 9.54-16.166L118.725 7.235c5.565-3.18 13.25-3.18 18.815 0L246.46 68.557c5.83 3.445 9.54 9.54 9.54 16.166V206.9c0 6.625-3.71 12.72-9.54 16.166l-109.185 63.18c-3.18 1.59-6.89 2.385-10.335 2.385h.06z"
          fill="#339933"
        />
        <path
          d="M161.379 205.575c-46.376 0-56.446-21.2-56.446-39.22 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 3.18 2.65 2.12 14.31 8.48 21.465 36.306 21.465 22.26 0 31.802-5.035 31.802-16.961 0-6.89-2.65-11.925-37.367-15.37-28.887-2.915-46.906-9.275-46.906-32.33 0-21.2 17.9-33.921 47.965-33.921 33.656 0 50.351 11.66 52.472 36.836.265 1.59-.53 3.18-2.12 3.71a3.22 3.22 0 0 1-1.325.265h-13.78c-1.325 0-2.65-.795-3.18-2.12-3.445-14.575-11.66-19.345-32.067-19.345-23.585 0-26.5 8.215-26.5 14.31 0 7.42 3.18 9.54 36.306 13.78 32.861 4.24 47.966 10.335 47.966 33.656-.265 23.055-19.08 36.04-52.736 36.04l.47-.265z"
          fill="#339933"
        />
      </svg>
    ),
  },
  "Express.js": {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 256 128" className="w-8 h-5">
        <path
          d="M116.504 3.58c-7.526-.45-14.404 4.277-20.12 8.927-7.706 6.22-14.053 14.5-18.44 23.65-2.905 6.037-5.147 12.492-5.32 19.23-.19 7.386 1.924 15.07 6.645 20.895 4.97 6.13 12.727 9.82 20.653 10.258 7.916.437 15.987-2.043 22.047-7.15 6.06-5.106 9.714-12.666 10.353-20.504.41-5.077-.477-10.32-2.9-14.795-2.63-4.863-7.33-8.57-12.757-9.617-5.43-1.047-11.35.603-15.292 4.64-3.945 4.037-5.567 10.14-4.057 15.492 1.51 5.35 6.163 9.548 11.677 10.23 5.513.682 11.217-2.394 13.77-7.44 2.552-5.047 1.56-11.595-2.39-15.5-3.95-3.906-10.177-4.65-14.95-1.803"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
        />
      </svg>
    ),
  },
  MongoDB: {
    color: "#47A248",
    svg: (
      <svg viewBox="0 0 256 549" className="w-5 h-7">
        <path
          d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.704 26.234 5.966 64.17 5.966 64.17h17.045s4.26-37.827 5.966-64.063l1.917-1.387s228.614-169.994 31.32-421.89zm-47.726 418.05s-10.227-8.744-12.785-13.11v-.535l12.357-274.292c0-.535.856-.535.856 0l12.357 274.292v.535c-2.557 4.367-12.785 13.11-12.785 13.11z"
          fill="#47A248"
        />
      </svg>
    ),
  },
  PostgreSQL: {
    color: "#4169E1",
    svg: (
      <svg viewBox="0 0 32 32" className="w-7 h-7">
        <path
          d="M28.13 13.545c-.268-2.388-1.267-4.236-2.922-5.443-1.04-.766-2.262-1.227-3.633-1.37-.442-.046-.9-.053-1.363-.02-1.26.092-2.43.485-3.424 1.14-.18.12-.357.248-.527.382a8.197 8.197 0 0 0-.525-.381c-.994-.655-2.165-1.049-3.425-1.141-.463-.033-.92-.026-1.363.02-1.37.143-2.593.604-3.633 1.37C5.43 9.31 4.43 11.158 4.162 13.546c-.337 2.98.37 6.296 1.918 8.9 1.128 1.89 2.566 3.007 4.054 3.12.54.04 1.08-.068 1.587-.319 1.018-.505 1.774-1.493 2.34-2.31.203.04.41.063.622.073a5.83 5.83 0 0 0 .633-.01 5.96 5.96 0 0 0 .633.01c.212-.01.419-.033.622-.073.566.817 1.322 1.805 2.34 2.31.507.25 1.047.358 1.587.318 1.488-.113 2.926-1.23 4.054-3.12 1.548-2.603 2.255-5.919 1.918-8.9z"
          fill="#4169E1"
        />
        <path
          d="M16.044 8.802c.103.082.205.167.303.255l.072.065.07-.066c.098-.088.2-.173.304-.255a6.99 6.99 0 0 1 3.077-1.425 7.88 7.88 0 0 1 1.214-.094c.384 0 .773.027 1.163.082 1.21.164 2.286.577 3.148 1.225 1.445 1.067 2.343 2.768 2.576 4.918.317 2.812-.352 5.936-1.8 8.352-1.004 1.685-2.237 2.683-3.454 2.773-.418.032-.84-.054-1.224-.247-.853-.423-1.563-1.334-2.121-2.17l-.192-.286-.319.096a5.27 5.27 0 0 1-1.493.202 5.234 5.234 0 0 1-1.476-.2l-.319-.097-.192.287c-.558.836-1.268 1.747-2.121 2.17-.384.193-.806.279-1.224.246-1.217-.09-2.45-1.087-3.454-2.772-1.448-2.416-2.117-5.54-1.8-8.352.233-2.15 1.131-3.851 2.576-4.918.862-.648 1.938-1.06 3.148-1.225a7.843 7.843 0 0 1 1.163-.082c.413 0 .822.032 1.214.094a6.99 6.99 0 0 1 3.077 1.425l.065.05z"
          fill="#fff"
        />
        <path
          d="M20.57 11.21c.17.026.278.066.332.116.105.097.043.309-.036.436-.08.127-.196.2-.336.214a.537.537 0 0 1-.285-.055c-.218-.114-.416-.326-.416-.326s.077-.21.24-.31c.163-.102.33-.1.501-.075zm-9.14 0c-.17.026-.278.066-.332.116-.105.097-.043.309.036.436.08.127.196.2.336.214a.537.537 0 0 0 .285-.055c.218-.114.416-.326.416-.326s-.077-.21-.24-.31c-.163-.102-.33-.1-.501-.075z"
          fill="#4169E1"
        />
      </svg>
    ),
  },
  Prisma: {
    color: "#2D3748",
    svg: (
      <svg viewBox="0 0 38 50" className="w-5 h-7">
        <path
          d="M36.671 34.093L21.3.642a1.46 1.46 0 0 0-2.604-.077L.214 36.303c-.372.7-.31 1.55.159 2.185l10.44 14.012c.52.697 1.42.957 2.224.639L36.21 43.8c1.017-.4 1.49-1.602.962-2.572l-.5-.936z"
          fill="#2D3748"
        />
        <path
          d="M36.671 34.093l-14.67-21.974a.658.658 0 0 0-1.198.042L8.256 38.534a.658.658 0 0 0 .64.921l27.075-3.27a.658.658 0 0 0 .7-.092z"
          fill="#4A5568"
        />
      </svg>
    ),
  },
  Docker: {
    color: "#2496ED",
    svg: (
      <svg viewBox="0 0 32 32" className="w-7 h-7">
        <path
          d="M31.813 12.838c-.388-.26-1.295-.356-1.988-.219-.09-.635-.448-1.186-.88-1.58l-.168-.148-.167.164c-.318.314-.527.89-.47 1.411.057.388.224.69.448.939-.224.124-.67.293-1.26.279H.493l-.045.246c-.157.847-.1 3.26 1.44 5.17.503.607 1.16 1.158 1.997 1.566 1.005.487 2.225.735 3.635.735 3.41 0 6.03-1.396 7.63-3.937.997.02 2.007-.24 2.67-.912l.06-.059-.055-.06c-.334-.362-.893-.542-1.484-.582.09-.23.14-.474.134-.718l-.002-.108-.11-.003c-.425-.01-.768.117-1.04.332-.057-.26-.19-.5-.405-.683l-.176-.15-.142.18c-.224.285-.355.73-.31 1.156.022.21.088.4.19.558-.458.21-1.168.33-1.836.317l-.223-.005.01.22c.055.987.22 1.87.504 2.636-1.28.558-3.01.697-5.138-.134-2.155-.84-3.02-2.342-3.31-3.496h-.003v-.002H29.76l.02-.147c.063-.444.15-1.657-.307-2.513zM12.78 11.82h1.755v1.726H12.78v-1.726zm0-1.98h1.755v1.727H12.78v-1.726zm-2.014 1.98h1.755v1.726H10.77v-1.726zm0-1.98h1.755v1.727H10.77v-1.726zm-2.022 1.98h1.756v1.726H8.748v-1.726zm0-1.98h1.756v1.727H8.748v-1.726zm-2.014 1.98h1.755v1.726H6.734v-1.726zm4.036-3.96h1.756V9.59H10.77V7.86zm-2.022 0h1.756V9.59H8.748V7.86zm-2.014 1.98h1.755v1.726H6.734V9.84zm10.062 1.98h1.756v1.726H16.8v-1.726zm-2.014 0h1.755v1.726H14.79v-1.726zm0-1.98h1.755v1.727H14.79v-1.726z"
          fill="#2496ED"
        />
      </svg>
    ),
  },
  Git: {
    color: "#F05032",
    svg: (
      <svg viewBox="0 0 92 92" className="w-7 h-7">
        <path
          d="M90.156 41.965L50.036 1.848a5.918 5.918 0 0 0-8.372 0l-8.328 8.332 10.566 10.566a7.03 7.03 0 0 1 7.23 1.684 7.043 7.043 0 0 1 1.673 7.277l10.183 10.184a7.028 7.028 0 0 1 7.278 1.672 7.04 7.04 0 0 1 0 9.957 7.045 7.045 0 0 1-9.961 0 7.043 7.043 0 0 1-1.532-7.66L49.93 33.23v26.11a7.028 7.028 0 0 1 1.86 11.238 7.045 7.045 0 0 1-9.962 0 7.04 7.04 0 0 1 0-9.957 7.034 7.034 0 0 1 2.308-1.539V32.97a7.004 7.004 0 0 1-2.308-1.535 7.049 7.049 0 0 1-1.516-7.7L30.144 13.147 1.734 41.558a5.918 5.918 0 0 0 0 8.37l40.12 40.121a5.918 5.918 0 0 0 8.372 0l39.93-39.929a5.925 5.925 0 0 0 0-8.155"
          fill="#F05032"
        />
      </svg>
    ),
  },
  AWS: {
    color: "#FF9900",
    svg: (
      <svg viewBox="0 0 128 128" className="w-7 h-7">
        <path
          d="M40.258 55.765l-5.395 11.546L21.54 38.875h-8.563l17.302 37.023 5.417-11.592 4.562-8.541zm47.484-.066l5.395 11.546 13.323-28.436h8.563L97.721 75.832l-5.417-11.592-4.562-8.541zm-13.636-9.148c-2.24 0-4.076.744-5.515 2.231-1.438 1.488-2.157 3.5-2.157 6.037 0 2.536.719 4.549 2.157 6.037 1.439 1.488 3.275 2.232 5.515 2.232 2.239 0 4.076-.744 5.515-2.232 1.438-1.488 2.157-3.5 2.157-6.037 0-2.537-.719-4.549-2.157-6.037-1.439-1.487-3.276-2.231-5.515-2.231zM64 44.574c3.706 0 6.727 1.174 9.063 3.52C75.4 50.44 76.57 53.45 76.57 57.12c0 3.67-1.17 6.68-3.507 9.025C70.727 68.49 67.706 69.664 64 69.664s-6.727-1.174-9.063-3.52C52.6 63.8 51.43 60.79 51.43 57.12c0-3.67 1.17-6.68 3.507-9.025C57.273 45.748 60.294 44.574 64 44.574z"
          fill="#FF9900"
        />
        <path
          d="M103.06 88.92c-11.584 7.685-28.425 11.773-42.921 11.773-20.312 0-38.607-7.508-52.447-19.989-1.088-.982-.113-2.321 1.19-1.558 14.938 8.688 33.4 13.914 52.461 13.914 12.863 0 27.012-2.667 40.036-8.194 1.965-.836 3.607 1.289 1.681 2.054z"
          fill="#FF9900"
        />
        <path
          d="M107.705 83.63c-1.48-1.897-9.808-0.897-13.554-.452-1.138.138-1.312-.853-.287-1.566 6.638-4.667 17.53-3.32 18.799-1.756 1.271 1.572-.333 12.486-6.567 17.694-.957.8-1.87.374-1.445-.686 1.403-3.5 4.554-11.236 3.054-13.234z"
          fill="#FF9900"
        />
      </svg>
    ),
  },
  Redis: {
    color: "#DC382D",
    svg: (
      <svg viewBox="0 0 32 32" className="w-7 h-7">
        <path
          d="M31.334 16.781c0 4.647-6.853 8.417-15.303 8.417S.728 21.428.728 16.78c0-4.648 6.852-8.418 15.303-8.418s15.303 3.77 15.303 8.419z"
          fill="#DC382D"
        />
        <path
          d="M15.313 23.136L4.97 18.498 4.964 8.78l10.349 4.638 10.367-4.57.006 9.718-10.373 4.57z"
          fill="#F9D29D"
        />
        <path
          d="M15.31 15.406l-10.344-4.638 10.35-4.702L25.67 10.77 15.31 15.406z"
          fill="#F7D09D"
        />
        <path
          d="M10.432 8.92L15.31 6.6l4.877 2.32-4.877 2.32z"
          fill="#DC382D"
        />
        <path d="M9.37 15.39l5.94 2.664-5.94 2.62V15.39z" fill="#AE2A20" />
      </svg>
    ),
  },
  GraphQL: {
    color: "#E10098",
    svg: (
      <svg viewBox="0 0 400 400" className="w-7 h-7">
        <path
          fill="#E10098"
          d="M57.468 302.66l-14.376-8.3 160.15-277.38 14.376 8.3z"
        />
        <path fill="#E10098" d="M39.8 272.2h320.3v16.6H39.8z" />
        <path
          fill="#E10098"
          d="M206.348 374.026l-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z"
        />
        <path
          fill="#E10098"
          d="M57.312 132.899l-8.3-14.375 160.21-92.5 8.3 14.376z"
        />
        <path
          fill="#E10098"
          d="M196.587 374.044l-14.376-8.3 160.15-277.38 14.376 8.3z"
        />
        <path fill="#E10098" d="M359.8 272.2H39.5v-16.6h320.3z" />
        <circle fill="#E10098" cx="200" cy="357.5" r="28.5" />
        <circle fill="#E10098" cx="200" cy="42.5" r="28.5" />
        <circle fill="#E10098" cx="357.5" cy="272" r="28.5" />
        <circle fill="#E10098" cx="42.5" cy="128" r="28.5" />
        <circle fill="#E10098" cx="357.5" cy="128" r="28.5" />
        <circle fill="#E10098" cx="42.5" cy="272" r="28.5" />
      </svg>
    ),
  },
  Python: {
    color: "#3776AB",
    svg: (
      <svg viewBox="0 0 128 128" className="w-7 h-7">
        <path
          fill="#387EB8"
          d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
        />
        <path
          fill="#FFE052"
          d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
        />
      </svg>
    ),
  },
  TensorFlow: {
    color: "#FF6F00",
    svg: (
      <svg viewBox="0 0 32 32" className="w-7 h-7">
        <path
          d="M16.038 1.038L2 9.108V17.2l4.924-2.847V21.5l9.114 5.265V32l14.038-8.108V15.8l-4.924 2.847V11.5zm0 3.462l9.114 5.262-9.114 5.262L6.924 9.762zM4 10.6l9.962 5.753v4.694L4 15.3zm20 0v4.694l-9.962 5.753V16.35zm-9.038 7.7l9.114 5.262v1.562l-9.114 5.262-9.114-5.262v-1.562z"
          fill="#FF6F00"
        />
      </svg>
    ),
  },
  OpenCV: {
    color: "#5C3EE8",
    svg: (
      <svg viewBox="0 0 128 128" className="w-7 h-7">
        <circle cx="34" cy="64" r="28" fill="#5C3EE8" />
        <circle cx="94" cy="64" r="28" fill="#E8533E" />
        <circle cx="64" cy="34" r="28" fill="#3EE853" />
        <circle cx="34" cy="64" r="14" fill="#fff" />
        <circle cx="94" cy="64" r="14" fill="#fff" />
        <circle cx="64" cy="34" r="14" fill="#fff" />
      </svg>
    ),
  },
  Vercel: {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 76 65" className="w-7 h-6">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
      </svg>
    ),
  },
  Linux: {
    color: "#FCC624",
    svg: (
      <svg viewBox="0 0 305 305" className="w-7 h-7">
        <path
          d="M152.8 1C68.8 1 1 68.8 1 152.8S68.8 304.6 152.8 304.6s151.8-67.8 151.8-151.8S236.8 1 152.8 1zm0 10c78.2 0 141.8 63.6 141.8 141.8S231 295.6 152.8 295.6 11 232 11 152.8 74.6 11 152.8 11z"
          fill="#FCC624"
        />
        <path
          d="M152.8 50c-18.4 0-34.3 7.5-46.1 20C94.9 82.5 87.6 97.6 87.6 114c0 16.4 7.3 31.5 19.1 43.5 11.8 12.5 27.7 20 46.1 20s34.3-7.5 46.1-20c11.8-12 19.1-27.1 19.1-43.5 0-16.4-7.3-31.5-19.1-43.5C187.1 57.5 171.2 50 152.8 50z"
          fill="#FCC624"
        />
      </svg>
    ),
  },
  Nginx: {
    color: "#009639",
    svg: (
      <svg viewBox="0 0 512 512" className="w-7 h-7">
        <path
          d="M255.918 0L.549 148.186v215.628L255.918 512l255.37-148.186V148.186z"
          fill="#009639"
        />
        <path
          d="M283.83 344.89h-47.237V212.97L145.18 344.89H97.943V167.11h47.237v131.92l91.413-131.92H283.83z"
          fill="#fff"
        />
      </svg>
    ),
  },
};

/* ─── Tech Data ─────────────────────────────────────────────── */

interface Tech {
  name: string;
  label?: string;
}

const categories: {
  id: string;
  label: string;
  color: string;
  accent: string;
  direction: "left" | "right";
  techs: Tech[];
}[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#3B82F6",
    accent: "#3B82F6",
    direction: "left",
    techs: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#10B981",
    accent: "#10B981",
    direction: "right",
    techs: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Prisma" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    color: "#8B5CF6",
    accent: "#8B5CF6",
    direction: "left",
    techs: [
      { name: "Docker" },
      { name: "AWS" },
      { name: "Vercel" },
      { name: "Git" },
      { name: "Linux" },
      { name: "Nginx" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#F59E0B",
    accent: "#F59E0B",
    direction: "right",
    techs: [{ name: "Python" }, { name: "TensorFlow" }, { name: "OpenCV" }],
  },
];

/* ─── 3D Marquee Card ──────────────────────────────────────── */

function TechCard({ name }: { name: string }) {
  const brand = BrandIcons[name];

  return (
    <motion.div
      whileHover={{ scale: 1.08, rotateY: 6, rotateX: -4, z: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className="flex flex-col items-center gap-2 min-w-[80px] cursor-default select-none">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
        style={{
          boxShadow: brand
            ? `0 0 20px ${brand.color}22, inset 0 1px 0 rgba(255,255,255,0.08)`
            : "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
        {brand ? (
          <span style={{ color: brand.color }}>{brand.svg}</span>
        ) : (
          <span className="text-2xl font-bold text-white/40">
            {name.slice(0, 2)}
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium text-white/50 text-center leading-tight max-w-[76px]">
        {name}
      </span>
    </motion.div>
  );
}

/* ─── 3D Marquee Row ───────────────────────────────────────── */

function MarqueeRow({
  techs,
  direction,
  accent,
  speed = 40,
}: {
  techs: Tech[];
  direction: "left" | "right";
  accent: string;
  speed?: number;
}) {
  const doubled = [...techs, ...techs, ...techs, ...techs];
  const totalItems = techs.length;
  const itemWidth = 80 + 32; // min-w + gap
  const totalWidth = totalItems * itemWidth;

  return (
    <div
      className="relative w-full overflow-hidden py-3"
      style={{ perspective: "800px" }}>
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, hsl(var(--background)), transparent)`,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, hsl(var(--background)), transparent)`,
        }}
      />

      {/* Accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
        }}
      />

      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ rotateX: "8deg", transformStyle: "preserve-3d" }}>
        {doubled.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} name={tech.name} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-16 overflow-hidden bg-background">
      {/* Subtle BG orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs text-foreground/70 mb-4 font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Tech Arsenal
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Stack &{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Tools and technologies I use to build fast, scalable products
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-1">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}>
              {/* Category label */}
              <div className="flex items-center gap-2 px-2 mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: cat.color }}
                />
                <span
                  className="text-[10px] font-mono font-semibold uppercase tracking-widest"
                  style={{ color: cat.color }}>
                  {cat.label}
                </span>
                <div
                  className="flex-1 h-px opacity-10"
                  style={{ background: cat.color }}
                />
              </div>

              <MarqueeRow
                techs={cat.techs}
                direction={cat.direction}
                accent={cat.accent}
                speed={cat.id === "ai" ? 25 : 40}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 text-sm text-foreground/70 hover:text-foreground group">
            Let's build something amazing
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
