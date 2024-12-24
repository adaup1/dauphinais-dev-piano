export const experienceValues = [
  {
    company: "Konverse",
    title: "Full Stack Software Engineer",
    companyImageSrc: "/images/konverse-logo.png",
    websiteUrl: "https://konverse.com/",
    description:
      "I've been working at Konverse as a full stack software engineer since early 2021. Konverse has a small team, so every developer touches every part of the stack. ",
    technologies: [
      "React",
      "TypeScript/JavaScript",
      "Apollo GraphQL",
      "PHP",
      "MySQL",
      "ElasticSearch",
      "Docker",
      "RabbitMQ",
      "AWS",
      "Apache Cordova",
    ],
    videoLabel: "Watch to learn how Konverse works:",
    videoThumbnailSrc:
      "https://konverse.com/wp-content/uploads/2023/06/video-poster.jpg",
    videoSrc:
      "https://konverse.com/wp-content/uploads/2023/06/Konverse-Demo-V4-with-VO-061223.webm",
    experience: [
      `Contributed major functionality to Group Sync using ElasticSearch. Group Sync is relied upon by almost every Konverse Client, including Hyatt, Aramark, Follett, RE/MAX, Berkshire Hathway, Sotheby’s and hundreds more. The group sync runs hourly on AWS EventBridge but can also be run manually. Groups bundle an unlimited number of users based on a variety of user attributes, allowing app admins to easily give thousands of users access to different parts of the app at once.`,
      `Introduced the Collections Editor; a tool used by Aramark, Follett, and many real-estate customers. Collections allow clients to group any routes in the app into a singular view for easy access with many customization options such as the ability to drag and drop items in any order using Material UI. Collections can also be created through a PHP REST API, which some clients opt to do.`,
      `Built features utilizing Google Cloud APIs such as an address form field that uses the Google Maps API and Google Places Autocomplete, as well as a plugin that leverages the Google Translate API to translate any post content in the application.`,
      `Created the Language Admin, using MUI Datagrid and optimistic responses with GraphQL. The Language Admin allows clients to dynamically change text throughout the application.`,
    ],
  },
  {
    company: "Idol Labs",
    title: "Unity Mobile Game Developer",
    companyImageSrc: "/images/idol-labs-logo.png",
    websiteUrl: "https://idollabs.com/",
    description:
      "My introduction to programming was in the Unity Game Engine. I spent about a year making my income building mobile games and doing client work while learning web development on the side. ",
    technologies: ["Unity", "C#", "Wwise", "WebGL"],
    videoLabel:
      "My game Battleseed Badger is no longer on the App Store, but you can watch a preview here:",
    videoThumbnailSrc: "",
    videoSrc: "https://www.youtube.com/shorts/Eu635z7KG9I",
    experience: [
      `Solo-developed a mobile game using Unity, implementing in-game currency, a virtual store, and monetization with Unity Ads; published on iOS and Google Play.`,
      `Programmed core gameplay mechanics and features in C# with the Unity API, ensuring smooth player experience and high performance.`,
      `Designed and produced all game assets, including custom artwork, music, and sound effects, creating a cohesive user experience.`,
      `Delivered a WebGL experience for a client, expanding accessibility and interactivity across web platforms.`,
    ],
  },
];
