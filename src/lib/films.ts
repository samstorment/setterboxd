import type { Film } from "$lib";
import { UniqueSet } from "./set";

const left = new UniqueSet<Film>(
    {
        id: '5bb5d7c1-d5d1-43ed-a55f-c9d09d030ec4',
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        poster: 'https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    },
    {
        id: 'e9c30409-d4e7-405b-9b5b-7c4be254e0ef',
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        year: 1994,
        poster: 'https://image.tmdb.org/t/p/w200/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'
    },
    {
        id: 'acda0d6e-1ed1-4d79-91b0-3b8de83d51aa',
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        year: 1972,
        poster: 'https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
    },
    {
        id: '83fe3d6a-c320-4891-a7f1-8df2e36e267b',
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        year: 1994,
        poster: 'https://image.tmdb.org/t/p/w200/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
    },
    {
        id: '28d52288-7c3b-4cc3-8847-8768ee7e5c9b',
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        year: 2008,
        poster: 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    },
    {
        id: 'd035c917-0a64-4bfc-a293-0edc0b9fa126',
        title: 'Forrest Gump',
        director: 'Robert Zemeckis',
        year: 1994,
        poster: 'https://image.tmdb.org/t/p/w200/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
    },
    {
        id: '3f5fe0b8-ef30-4f15-9609-99c494932b98',
        title: 'Fight Club',
        director: 'David Fincher',
        year: 1999,
        poster: 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
    },
    {
        id: '4aeb1de5-597d-4db8-8d3e-3c13b65d4498',
        title: 'The Matrix',
        director: 'Lana Wachowski',
        year: 1999,
        poster: 'https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
    },
    {
        id: 'c1e1f69d-97d1-4e2e-95a7-50a7bc73c68c',
        title: 'Goodfellas',
        director: 'Martin Scorsese',
        year: 1990,
        poster: 'https://image.tmdb.org/t/p/w200/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg'
    },
    {
        id: 'b8e41b2e-d9b5-4b97-a7d1-4f8e6d972e94',
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014,
        poster: 'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },
    {
        id: 'd8a5da1b-0a20-4908-b03a-1b04fe25f672',
        title: 'The Lord of the Rings',
        director: 'Peter Jackson',
        year: 2001,
        poster: 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'
    },
    {
        id: '6f018dc2-4b2f-46c1-9863-882e3ecfbfb4',
        title: "Schindler's List",
        director: 'Steven Spielberg',
        year: 1993,
        poster: 'https://image.tmdb.org/t/p/w200/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg'
    },
    {
        id: '16b36a33-27a4-4f3e-b046-aa79bdcf90a1',
        title: 'The Green Mile',
        director: 'Frank Darabont',
        year: 1999,
        poster: 'https://image.tmdb.org/t/p/w200/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg'
    },
    {
        id: '25114d95-04df-4645-81ff-6235a49ef2a5',
        title: 'The Godfather: Part II',
        director: 'Francis Ford Coppola',
        year: 1974,
        poster: 'https://image.tmdb.org/t/p/w200/lm3pQ2QoQ16pextRsmnUbG2onES.jpg'
    },
    {
        id: 'de5c8b38-f2b8-44f6-af32-10f9c73d1276',
        title: 'The Silence of the Lambs',
        director: 'Jonathan Demme',
        year: 1991,
        poster: 'https://image.tmdb.org/t/p/w200/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg'
    }
);

const right = new UniqueSet<Film>(
    {
        id: 'f2a8fb8b-e23a-4bcb-9b76-3f5df1660a3d',
        title: 'Avatar',
        director: 'James Cameron',
        year: 2009,
        poster: 'https://image.tmdb.org/t/p/w200/kyeqWdyUXW608qlYkRqosgbbJyK.jpg'
    },
    {
        id: 'f3e74e90-72a2-4a52-9da4-1f0547f01352',
        title: 'The Social Network',
        director: 'David Fincher',
        year: 2010,
        poster: 'https://image.tmdb.org/t/p/w200/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg'
    },
    {
        id: 'cf9a9e22-d57d-4cf7-b3c6-06a6aadb1d9d',
        title: 'Black Swan',
        director: 'Darren Aronofsky',
        year: 2010,
        poster: 'https://image.tmdb.org/t/p/w200/rH19vkjAzCZ0HIUvrgB3rowm68h.jpg'
    },
    {
        id: '98b9bb12-8d0b-4fc7-90b3-888c62513a4f',
        title: "The King's Speech",
        director: 'Tom Hooper',
        year: 2010,
        poster: 'https://image.tmdb.org/t/p/w200/uQ538BfYLDJh3GXlzRZLo0j7PFj.jpg'
    },
    {
        id: '10fa1f5e-61ae-41cf-b45f-71f4ff8b0084',
        title: 'Inglourious Basterds',
        director: 'Quentin Tarantino',
        year: 2009,
        poster: 'https://image.tmdb.org/t/p/w200/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg'
    },
    {
        id: '43d0e443-d7c1-4785-9c91-438e9031601c',
        title: 'The Curious Case of Benjamin Button',
        director: 'David Fincher',
        year: 2008,
        poster: 'https://image.tmdb.org/t/p/w200/26wEWZYt6yJkwRVkjcbwJEFh9IS.jpg'
    },
    {
        id: 'b2b3cf50-37e3-4fd5-93a5-ff899d9a6df7',
        title: 'Up',
        director: 'Pete Docter',
        year: 2009,
        poster: 'https://image.tmdb.org/t/p/w200/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg'
    },
    {
        id: 'f9d3e739-5030-4d13-b5e6-0329d18aa1d3',
        title: 'The Grand Budapest Hotel',
        director: 'Wes Anderson',
        year: 2014,
        poster: 'https://image.tmdb.org/t/p/w200/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg'
    },
    {
        id: '9e38d4cb-6744-4d56-bf0c-b6ab14fbf5b1',
        title: 'La La Land',
        director: 'Damien Chazelle',
        year: 2016,
        poster: 'https://image.tmdb.org/t/p/w200/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'
    },
    {
        id: '3e5640ac-efec-4b43-a26f-5f144cf80c22',
        title: 'Moonlight',
        director: 'Barry Jenkins',
        year: 2016,
        poster: 'https://image.tmdb.org/t/p/w200/4911T5FbJ9eD2Faz5Z8cT3SUhU3.jpg'
    },
    {
        id: 'ea77c1c3-9d57-45d0-ba48-2cd8e42d0877',
        title: 'Whiplash',
        director: 'Damien Chazelle',
        year: 2014,
        poster: 'https://image.tmdb.org/t/p/w200/7fn624j5lj3xTme2SgiLCeuedmO.jpg'
    },
    {
        id: '2c9e1d2f-5bb0-4e3d-8a8a-736ab3ddfa20',
        title: 'The Revenant',
        director: 'Alejandro González Iñárritu',
        year: 2015,
        poster: 'https://image.tmdb.org/t/p/w200/wkA03WX3IdHYMX2gIxaCwqowQX.jpg'
    },
    {
        id: 'b306674f-ae34-4c2f-b8b3-d4e4a420fc1c',
        title: 'Joker',
        director: 'Todd Phillips',
        year: 2019,
        poster: 'https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'
    },
    {
        id: 'ee81d94f-c7fb-4c2a-bd88-1eb4fd14299d',
        title: '1917',
        director: 'Sam Mendes',
        year: 2019,
        poster: 'https://image.tmdb.org/t/p/w200/iZf0KyrE25z1sage4SYFLCCrMi9.jpg'
    },
    {
        id: 'c8230b97-5dab-4b92-b918-ee9cfb1d1e69',
        title: 'Parasite',
        director: 'Bong Joon-ho',
        year: 2019,
        poster: 'https://image.tmdb.org/t/p/w200/6EM7Jm3veKSW9ELMajSSxslYWDa.jpg'
    },
    // shared
    {
        id: '5bb5d7c1-d5d1-43ed-a55f-c9d09d030ec4',
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        poster: 'https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    },
    {
        id: 'e9c30409-d4e7-405b-9b5b-7c4be254e0ef',
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        year: 1994,
        poster: 'https://image.tmdb.org/t/p/w200/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'
    },
    {
        id: 'acda0d6e-1ed1-4d79-91b0-3b8de83d51aa',
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        year: 1972,
        poster: 'https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
    },
    {
        id: '83fe3d6a-c320-4891-a7f1-8df2e36e267b',
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        year: 1994,
        poster: 'https://image.tmdb.org/t/p/w200/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
    },
    {
        id: '28d52288-7c3b-4cc3-8847-8768ee7e5c9b',
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        year: 2008,
        poster: 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    },

);
