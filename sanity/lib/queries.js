import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `
    *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author ->name match $search ] | order(_createdAt desc){
        _id,
        title,
        _createdAt,
        slug,
        views,
        description,
        category,
        image,
        author ->{
        _id,name,image,bio,id
        },
    }
    `
);

export const STARTUPS_BY_ID_QUERY = defineQuery(
  `
    *[_type == "startup" && _id == $id][0]{
         _id,
        title,
        _createdAt,
        slug,
        views,
        description,
        category,
        image,
        author ->{
        _id,name,username,image,bio,id
        },
        pitch,
    }
    `
);

export const STARTUPS_VIEWS_QUERY = defineQuery(
  `
    *[_type == "startup" && _id == $id][0]{
        views,
        _id,
    }
    `
);

export const AUTHOR_BY_ID_QUERY = defineQuery(
  `
        *[_type == "author" && id == $id][0]{
            _id,
            id,
            name,
            username,
            email,
            image,
            bio,
        }
    `
);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(
  `
    *[_type == "startup" && author._ref == $authorId] | order(_createdAt desc){
        _id,
        title,
        _createdAt,
        slug,
        views,
        description,
        category,
        image,
        author ->{
            _id,name,image,bio,id
        },
    }
    `
);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(
  `*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }}
    `
);
