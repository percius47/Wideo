/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

 import { v4 as uuid } from "uuid";
 // https://i.ytimg.com/vi/ewMksAbgdBI/maxresdefault.jpg
 
 export const videos = [
   {
     _id: uuid(),
     title: "Choose or Die | Official Trailer | Netflix",
     creator: "Netflix",
     thumbnail: "https://i.ytimg.com/vi/7vUQYzZ_UZc/maxresdefault.jpg",
     src: "https://www.youtube.com/embed/7vUQYzZ_UZc",
     creatorProfile:
       "https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s88-c-k-c0x00ffffff-no-rj",
     views: 1213423787,
     category: "Netflix",
     uploaded: new Date("Apr 06 2021 12:31:25"),
   },
   {
     _id: uuid(),
     title: "Operation Mincemeat | Official Trailer | Netflix",
     creator: "Netflix",
     thumbnail: "https://i.ytimg.com/vi/zwkSyrN0mvY/maxresdefault.jpg",
     src: "https://www.youtube.com/embed/zwkSyrN0mvY",
     creatorProfile:
       "https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj",
     views: 121348,
     category: "Netflix",
     uploaded: new Date("Feb 23 2022 12:31:25"),
   },
   {
     _id: uuid(),
     title: "Dasvi | Official Trailer | Abhishek Bachchan, Yami Gautam, Nimrat Kaur | Netflix India",
     creator: "Netflix India",
     thumbnail: "https://i.ytimg.com/vi/-FrqlHlUgz4/maxresdefault.jpg",
     src: "https://www.youtube.com/embed/-FrqlHlUgz4",
     
     creatorProfile:
       "https://yt3.ggpht.com/zgMN9BuSQByG1SrpmLwcNB3MQhjDhS_pl9H1h7TaRievMfS4UpU7Z36j77z5_hnIW4N8uFX3NA=s88-c-k-c0x00ffffff-no-rj",
     views: 67000,
     category: "Bollywood",
     uploaded: new Date("March 23 2022 12:31:25"),
   },
   {
     _id: uuid(),
     title: "Jersey - New Official Trailer | Shahid Kapoor | Mrunal Thakur | Gowtam Tinnanuri | 14th April 2022",
     creator: "Zee Music Company",
     thumbnail: "https://i.ytimg.com/vi/9hZ2UW6Jv-I/maxresdefault.jpg",
     src: "https://www.youtube.com/embed/9hZ2UW6Jv-I",
     creatorProfile:
       "https://yt3.ggpht.com/EEGERwlaKJd27zSEPQF3d__-tPyppIgFfKvNfBkWa7ssMKBWqQUbuCTLe-kAnTB1r6kJQVxyxwY=s88-c-k-c0x00ffffff-no-rj",
     views: 3321348,
     category: "Bollywood",
     uploaded: new Date("Apr 04 2022 10:31:25"),
   },
   {
     _id: uuid(),
     title: "Moon Knight | New Episode 3 Promo Teaser Trailer | 2022 | Disney+ | 4K",
     creator: "Hi Geek",
     thumbnail: "https://i.ytimg.com/vi/TEd1012DT0I/maxresdefault.jpg",
     creatorProfile:
       "https://yt3.ggpht.com/lstlcg-5tAytnHi5XFR53AEEFyDwUyikoiBnJpiVs6YcmnVisBkGif0fViO_UfinEm84iviw6bY=s88-c-k-c0x00ffffff-no-rj",
     src: "https://www.youtube.com/embed/TEd1012DT0I",
     views: 9000000,
     category: "TV",
     uploaded: new Date("Jun 02 2018 12:31:25"),
   },
   {
     _id: uuid(),
     title: "Runway 34 | Official Trailer | Amitabh Bachchan, Ajay Devgn, Rakul Preet | 29th April 2022",
     creator: "Ajay Devgn Ffilms",
     thumbnail: "https://i.ytimg.com/vi/Lb8mQCpZHco/maxresdefault.jpg",
     creatorProfile:
       "https://yt3.ggpht.com/CycH3AFaYMnkUdgdGtHQx-eOtSbjkkQCN7Wb--DJq6x9mX80aJxs0Rarrjcv3iekfZpUXkSzMXM=s88-c-k-c0x00ffffff-no-rj",
     src: "https://www.youtube.com/embed/Lb8mQCpZHco",
     views: 123000,
     category: "Bollywood",
     uploaded: new Date("Mar 02 2022 11:31:25"),
   },
   {
     _id: uuid(),
     title: "Guilty Minds - Official Trailer | Amazon Prime Video",
     creator: "Amazon Prime Video India",
     thumbnail: "https://i.ytimg.com/vi/LP8goZ3Ok6s/mqdefault.jpg",
     src: "https://www.youtube.com/embed/LP8goZ3Ok6s",
     creatorProfile:
       "https://yt3.ggpht.com/_CvHmCOdI9VFzlzjDTARgSnm6GyQRRhdYItcsCouTEPsjl5PHpqMl_rbLyxd54b2eNXDhOxeSg=s88-c-k-c0x00ffffff-no-rj",
     views: 12134,
     category: "TV",
     uploaded: new Date("Jul 17 2020 11:31:25"),
   },
   {
     _id: uuid(),
     title: "365 Days: This Day | Official Trailer | Netflix",
     creator: "Netflix",
     thumbnail: "https://i.ytimg.com/vi/pyM3z73oMAk/maxresdefault.jpg",
     creatorProfile:
       "https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj",
     src: "https://www.youtube.com/embed/pyM3z73oMAk",
     views: 9000,
     category: "TV",
     uploaded: new Date("Nov 25 2020 11:31:25"),
   },
 ];
 