
export const sidebarLinks = [
{
    imgURL: "/home.svg",
    route: "/",
    label: "Home",
},
{
    imgURL: "/search.svg",
    route: "/search",
    label: "Search",
},
{
    imgURL: "/heart.svg",
    route: "/activity",
    label: "Activity",
},
{
    imgURL: "/create.svg",
    route: "/create-thread",
    label: "Create Thread",
},

{
    imgURL: "/user.svg",
    route: "/profile",
    label: "Profile",
},
];

export const profileTabs = [
{ value: "threads", label: "Threads", icon: "/reply.svg" },
{ value: "replies", label: "Replies", icon: " /members.svg" },
{ value: "tagged", label: "Tagged", icon: "/tag.svg" },
];

export const ThreadCardTabs = [
    {  alt: "share icon", icon: "/share.svg" },
    {  alt: "Replie icon", icon: " /reply.svg" , link:true},
    {  alt: "repost icon", icon: "/repost.svg" },
    {  alt: "like icon", icon: "/heart-gray.svg" },
];

export const communityTabs = [
{ value: "threads", label: "Threads", icon: "/reply.svg" },
{ value: "members", label: "Members", icon: "/members.svg" },
{ value: "requests", label: "Requests", icon: "/request.svg" },
];