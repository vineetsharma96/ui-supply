/*
MIT License

Copyright (c) Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://magicui.design/docs/components/tweet-card
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/tweet-card.tsx
import { Suspense } from "react";
import { enrichTweet } from "react-tweet";
import { getTweet } from "react-tweet/api";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/tweet-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Twitter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    ...props,
    children: /* @__PURE__ */ jsxs("g", { children: [
      /* @__PURE__ */ jsx("path", { fill: "none", d: "M0 0h24v24H0z" }),
      /* @__PURE__ */ jsx("path", { d: "M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" })
    ] })
  }
);
var Verified = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "svg",
  {
    "aria-label": "Verified Account",
    viewBox: "0 0 24 24",
    className,
    ...props,
    children: /* @__PURE__ */ jsx("g", { fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" }) })
  }
);
var truncate = (str, length) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};
var Skeleton = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx("div", { className: cn("bg-primary/10 rounded-md", className), ...props });
};
var TweetSkeleton = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-xl border p-4",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-20 w-full" })
    ]
  }
);
var TweetNotFound = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx("h3", { children: "Tweet not found" })
  }
);
var TweetHeader = ({ tweet }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-start justify-between tracking-normal", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: tweet.user.url,
        target: "_blank",
        rel: "noreferrer",
        className: "shrink-0",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            title: `Profile picture of ${tweet.user.name}`,
            alt: tweet.user.screen_name,
            height: 48,
            width: 48,
            src: tweet.user.profile_image_url_https,
            className: "border-border/50 overflow-hidden rounded-full border"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: tweet.user.url,
          target: "_blank",
          rel: "noreferrer",
          className: "text-foreground flex items-center font-medium whitespace-nowrap transition-opacity hover:opacity-80",
          children: [
            truncate(tweet.user.name, 20),
            tweet.user.verified || tweet.user.is_blue_verified && /* @__PURE__ */ jsx(Verified, { className: "ml-1 inline size-4 text-blue-500" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: tweet.user.url,
          target: "_blank",
          rel: "noreferrer",
          className: "text-muted-foreground hover:text-foreground text-sm transition-colors",
          children: [
            "@",
            truncate(tweet.user.screen_name, 16)
          ]
        }
      ) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("a", { href: tweet.url, target: "_blank", rel: "noreferrer", children: [
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Link to tweet" }),
    /* @__PURE__ */ jsx(Twitter, { className: "text-muted-foreground hover:text-foreground size-5 items-start transition-all ease-in-out hover:scale-105" })
  ] })
] });
var TweetBody = ({ tweet }) => /* @__PURE__ */ jsx("div", { className: "text-[15px] leading-relaxed tracking-normal wrap-break-word", children: tweet.entities.map((entity, idx) => {
  switch (entity.type) {
    case "url":
    case "symbol":
    case "hashtag":
    case "mention":
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: entity.href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-muted-foreground hover:text-foreground text-[15px] font-normal transition-colors",
          children: /* @__PURE__ */ jsx("span", { children: entity.text })
        },
        idx
      );
    case "text":
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-foreground text-[15px] font-normal",
          dangerouslySetInnerHTML: { __html: entity.text }
        },
        idx
      );
    default:
      return null;
  }
}) });
var TweetMedia = ({ tweet }) => {
  if (!tweet.video && !tweet.photos) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-center", children: [
    tweet.video && /* @__PURE__ */ jsxs(
      "video",
      {
        poster: tweet.video.poster,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        className: "rounded-xl border shadow-sm",
        children: [
          /* @__PURE__ */ jsx("source", { src: tweet.video.variants[0].src, type: "video/mp4" }),
          "Your browser does not support the video tag."
        ]
      }
    ),
    tweet.photos && /* @__PURE__ */ jsxs("div", { className: "relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "shrink-0 snap-center sm:w-2" }),
      tweet.photos.map((photo) => /* @__PURE__ */ jsx(
        "img",
        {
          src: photo.url,
          width: photo.width,
          height: photo.height,
          title: "Photo by " + tweet.user.name,
          alt: tweet.text,
          className: "h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
        },
        photo.url
      )),
      /* @__PURE__ */ jsx("div", { className: "shrink-0 snap-center sm:w-2" })
    ] }),
    !tweet.video && !tweet.photos && // @ts-expect-error package doesn't have type definitions
    tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && /* @__PURE__ */ jsx(
      "img",
      {
        src: (
          // @ts-expect-error package doesn't have type definitions
          tweet.card.binding_values.thumbnail_image_large.image_value.url
        ),
        className: "h-64 rounded-xl border object-cover shadow-sm",
        alt: tweet.text
      }
    )
  ] });
};
var withSafeEntities = (tweet) => ({
  ...tweet,
  entities: {
    ...tweet.entities,
    hashtags: tweet.entities?.hashtags ?? [],
    urls: tweet.entities?.urls ?? [],
    symbols: tweet.entities?.symbols ?? [],
    user_mentions: tweet.entities?.user_mentions ?? []
  }
});
var MagicTweet = ({
  tweet,
  className,
  ...props
}) => {
  const safeTweet = {
    ...withSafeEntities(tweet),
    quoted_tweet: tweet.quoted_tweet ? withSafeEntities(tweet.quoted_tweet) : void 0
  };
  const enrichedTweet = enrichTweet(safeTweet);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl border p-5",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(TweetHeader, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx(TweetBody, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx(TweetMedia, { tweet: enrichedTweet })
      ]
    }
  );
};
var TweetCard = async ({
  id,
  components,
  fallback = /* @__PURE__ */ jsx(TweetSkeleton, {}),
  onError,
  ...props
}) => {
  const tweet = id ? await getTweet(id).catch((err) => {
    if (onError) {
      onError(err);
    } else {
      console.error(err);
    }
  }) : void 0;
  if (!tweet) {
    const NotFound = components?.TweetNotFound ?? TweetNotFound;
    return /* @__PURE__ */ jsx(NotFound, { ...props });
  }
  return /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(MagicTweet, { tweet, ...props }) });
};

// entry.jsx
import React from "react";

// registry:components/ui/client-tweet-card.tsx
import { useTweet } from "react-tweet";

// registry:tweet-card.tsx
import { Suspense as Suspense2 } from "react";
import { enrichTweet as enrichTweet2 } from "react-tweet";
import { getTweet as getTweet2 } from "react-tweet/api";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Twitter2 = ({ className, ...props }) => /* @__PURE__ */ jsx2(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    ...props,
    children: /* @__PURE__ */ jsxs2("g", { children: [
      /* @__PURE__ */ jsx2("path", { fill: "none", d: "M0 0h24v24H0z" }),
      /* @__PURE__ */ jsx2("path", { d: "M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" })
    ] })
  }
);
var Verified2 = ({ className, ...props }) => /* @__PURE__ */ jsx2(
  "svg",
  {
    "aria-label": "Verified Account",
    viewBox: "0 0 24 24",
    className,
    ...props,
    children: /* @__PURE__ */ jsx2("g", { fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" }) })
  }
);
var truncate2 = (str, length) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};
var Skeleton2 = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx2("div", { className: cn("bg-primary/10 rounded-md", className), ...props });
};
var TweetSkeleton2 = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs2(
  "div",
  {
    className: cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-xl border p-4",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex flex-row gap-2", children: [
        /* @__PURE__ */ jsx2(Skeleton2, { className: "size-10 shrink-0 rounded-full" }),
        /* @__PURE__ */ jsx2(Skeleton2, { className: "h-10 w-full" })
      ] }),
      /* @__PURE__ */ jsx2(Skeleton2, { className: "h-20 w-full" })
    ]
  }
);
var TweetNotFound2 = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx2(
  "div",
  {
    className: cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx2("h3", { children: "Tweet not found" })
  }
);
var TweetHeader2 = ({ tweet }) => /* @__PURE__ */ jsxs2("div", { className: "flex flex-row items-start justify-between tracking-normal", children: [
  /* @__PURE__ */ jsxs2("div", { className: "flex items-center space-x-3", children: [
    /* @__PURE__ */ jsx2(
      "a",
      {
        href: tweet.user.url,
        target: "_blank",
        rel: "noreferrer",
        className: "shrink-0",
        children: /* @__PURE__ */ jsx2(
          "img",
          {
            title: `Profile picture of ${tweet.user.name}`,
            alt: tweet.user.screen_name,
            height: 48,
            width: 48,
            src: tweet.user.profile_image_url_https,
            className: "border-border/50 overflow-hidden rounded-full border"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxs2(
        "a",
        {
          href: tweet.user.url,
          target: "_blank",
          rel: "noreferrer",
          className: "text-foreground flex items-center font-medium whitespace-nowrap transition-opacity hover:opacity-80",
          children: [
            truncate2(tweet.user.name, 20),
            tweet.user.verified || tweet.user.is_blue_verified && /* @__PURE__ */ jsx2(Verified2, { className: "ml-1 inline size-4 text-blue-500" })
          ]
        }
      ),
      /* @__PURE__ */ jsx2("div", { className: "flex items-center space-x-1", children: /* @__PURE__ */ jsxs2(
        "a",
        {
          href: tweet.user.url,
          target: "_blank",
          rel: "noreferrer",
          className: "text-muted-foreground hover:text-foreground text-sm transition-colors",
          children: [
            "@",
            truncate2(tweet.user.screen_name, 16)
          ]
        }
      ) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs2("a", { href: tweet.url, target: "_blank", rel: "noreferrer", children: [
    /* @__PURE__ */ jsx2("span", { className: "sr-only", children: "Link to tweet" }),
    /* @__PURE__ */ jsx2(Twitter2, { className: "text-muted-foreground hover:text-foreground size-5 items-start transition-all ease-in-out hover:scale-105" })
  ] })
] });
var TweetBody2 = ({ tweet }) => /* @__PURE__ */ jsx2("div", { className: "text-[15px] leading-relaxed tracking-normal wrap-break-word", children: tweet.entities.map((entity, idx) => {
  switch (entity.type) {
    case "url":
    case "symbol":
    case "hashtag":
    case "mention":
      return /* @__PURE__ */ jsx2(
        "a",
        {
          href: entity.href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-muted-foreground hover:text-foreground text-[15px] font-normal transition-colors",
          children: /* @__PURE__ */ jsx2("span", { children: entity.text })
        },
        idx
      );
    case "text":
      return /* @__PURE__ */ jsx2(
        "span",
        {
          className: "text-foreground text-[15px] font-normal",
          dangerouslySetInnerHTML: { __html: entity.text }
        },
        idx
      );
    default:
      return null;
  }
}) });
var TweetMedia2 = ({ tweet }) => {
  if (!tweet.video && !tweet.photos) return null;
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-1 items-center justify-center", children: [
    tweet.video && /* @__PURE__ */ jsxs2(
      "video",
      {
        poster: tweet.video.poster,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        className: "rounded-xl border shadow-sm",
        children: [
          /* @__PURE__ */ jsx2("source", { src: tweet.video.variants[0].src, type: "video/mp4" }),
          "Your browser does not support the video tag."
        ]
      }
    ),
    tweet.photos && /* @__PURE__ */ jsxs2("div", { className: "relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto", children: [
      /* @__PURE__ */ jsx2("div", { className: "shrink-0 snap-center sm:w-2" }),
      tweet.photos.map((photo) => /* @__PURE__ */ jsx2(
        "img",
        {
          src: photo.url,
          width: photo.width,
          height: photo.height,
          title: "Photo by " + tweet.user.name,
          alt: tweet.text,
          className: "h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
        },
        photo.url
      )),
      /* @__PURE__ */ jsx2("div", { className: "shrink-0 snap-center sm:w-2" })
    ] }),
    !tweet.video && !tweet.photos && // @ts-expect-error package doesn't have type definitions
    tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && /* @__PURE__ */ jsx2(
      "img",
      {
        src: (
          // @ts-expect-error package doesn't have type definitions
          tweet.card.binding_values.thumbnail_image_large.image_value.url
        ),
        className: "h-64 rounded-xl border object-cover shadow-sm",
        alt: tweet.text
      }
    )
  ] });
};
var withSafeEntities2 = (tweet) => ({
  ...tweet,
  entities: {
    ...tweet.entities,
    hashtags: tweet.entities?.hashtags ?? [],
    urls: tweet.entities?.urls ?? [],
    symbols: tweet.entities?.symbols ?? [],
    user_mentions: tweet.entities?.user_mentions ?? []
  }
});
var MagicTweet2 = ({
  tweet,
  className,
  ...props
}) => {
  const safeTweet = {
    ...withSafeEntities2(tweet),
    quoted_tweet: tweet.quoted_tweet ? withSafeEntities2(tweet.quoted_tweet) : void 0
  };
  const enrichedTweet = enrichTweet2(safeTweet);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl border p-5",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx2(TweetHeader2, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx2(TweetBody2, { tweet: enrichedTweet }),
        /* @__PURE__ */ jsx2(TweetMedia2, { tweet: enrichedTweet })
      ]
    }
  );
};

// registry:components/ui/client-tweet-card.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ClientTweetCard = ({
  id,
  apiUrl,
  fallback = /* @__PURE__ */ jsx3(TweetSkeleton2, {}),
  components,
  fetchOptions,
  onError,
  ...props
}) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions);
  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound ?? TweetNotFound2;
    return /* @__PURE__ */ jsx3(NotFound, { error: onError ? onError(error) : error });
  }
  return /* @__PURE__ */ jsx3(MagicTweet2, { tweet: data, ...props });
};

// registry:components/ui/tweet-card-demo.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function TweetDemo() {
  return /* @__PURE__ */ jsx4(SampleTweetCard, {});
}
// Deterministic sample keeps the default preview usable without a social API.
// ClientTweetCard and the original upstream APIs remain available above.
import { useState as useSampleTweetState } from "react";
import { Heart as SampleHeart, MessageCircle as SampleReply, Share2 as SampleShare } from "lucide-react";
function SampleTweetCard(){const [liked,setLiked]=useSampleTweetState(false);const [reply,setReply]=useSampleTweetState(false);const [copied,setCopied]=useSampleTweetState(false);return <article className="ffx-social-card"><header><span className="ffx-social-avatar">ui</span><div><strong>UI Supply</strong><small>Sample post</small></div><span className="ffx-social-mark">𝕏</span></header><p>Small details make a difference. This is sample content for a reusable social card.</p><footer><button aria-label="Like sample post" aria-pressed={liked} onClick={()=>setLiked(!liked)}><SampleHeart size={16}/>{liked?1:0}</button><button aria-label="Reply to sample post" aria-expanded={reply} onClick={()=>setReply(!reply)}><SampleReply size={16}/>Reply</button><button aria-label="Copy post link" onClick={async()=>{try{await navigator.clipboard.writeText(location.origin+"/#tweet-card");setCopied(true)}catch{setCopied(false)}}}><SampleShare size={16}/>{copied?"Copied":"Share"}</button></footer>{reply&&<form onSubmit={e=>{e.preventDefault();setReply(false)}}><input aria-label="Sample reply" placeholder="Write a reply…" required/><button type="submit">Preview reply</button></form>}</article>}

// entry.jsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx5("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx5("div", { className: "vendor-content", children: /* @__PURE__ */ jsx5(TweetDemo, {}) }) });
}
export {
  MagicTweet,
  TweetBody,
  TweetCard,
  TweetHeader,
  TweetMedia,
  TweetNotFound,
  TweetSkeleton,
  ClientTweetCard,
  Component as default,
  truncate
};
