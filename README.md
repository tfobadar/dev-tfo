# TFO Website

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

This repo does not create any pages file at the code level except for [[...slug]].tsx and sitemap.tsx file. Since the content is served from [Storyblok](https://www.storyblok.com/home), all the frontend pages are created in Storyblok. [[...slug]].tsx page acts as a catch all page which based on route/slug will query Storyblok and fetches the page content(if it exists else renders 404 page) and executes logic in [[...slug]].tsx.

## Components

This project tries to follow [Atomic design principles](https://atomicdesign.bradfrost.com/chapter-2/) were we create components first and use them as building blocks to create bigger component/section/page.

All such components are placed under the folder `components`. These components are then exported and linked in Storyblok API
in `_app.tsx` file.

In addition to this, we make use of `<StoryblokComponent />` component imported from `@storyblok/react`(Storyblok Official) library to dynamically render the components that we have created based the Storyblok content.

Example:

```javascript
import { StoryblokComponentProps } from '@/types/component';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

const Articles = (props: StoryblokComponentProps) => {
  const { blok } = props;

  return (
    <main {...storyblokEditable(blok)}>
      {blok.body
        ? blok.body.map((blok: any) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))
        : null}
    </main>
  );
};

export default Articles;
```

This repo also imports compoennts from `@tfo/mytfo-components` for majority of the UI components. For more info check out [@tfo/mytfo-components](https://dev.azure.com.mcas.ms/tfocloud/Prospect%20Journey/_git/mytfo-components) library for implementation.

Whenever utlizing `@tfo/mytfo-components` we prepare the props in a way that can be accepted by the component because content/props recieved from Storyblok will be incompatible for direct usage. One such example can be out in [Card With Top Image](https://dev.azure.com.mcas.ms/tfocloud/TFOWEB/_git/TFOWEB?path=/src/components/Cards/TopImage.tsx)

#### Coding Standards and Linting

This repo is integrated with ESLint for code linting and coding standards with Typescript support. It is also integrated with `husky` and `lint-staged` for validating and catching any errors during `pre-commit` and `pre-push`.

#### Unit test cases

It is recommended to write unit test cases for the components that are newly created at this repo level. Components that makes use of `@tfo/mytfo-components` may skip it as they are already taken care at library level.

## .npmrc file for using `@tfo/mytfo-components`

create `.npmrc` file at project root level and place below content to download components library from tfo registry

```
@tfo:registry=https://pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/registry/

always-auth=true

; begin auth token
//pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/registry/:username=tfocloud
//pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/registry/:_password=YOUR PASSWORD ([link](https://learn.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops&tabs=linux%2Cclassic) to generate password )
//pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/:username=tfocloud
//pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/:_password=YOUR PASSWORD ([link](https://learn.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops&tabs=linux%2Cclassic) to generate password)
//pkgs.dev.azure.com/tfocloud/_packaging/mytfo-components/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```
