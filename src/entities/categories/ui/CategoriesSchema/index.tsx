import Head from 'next/head'
import React from 'react'

import type { CategoryModel } from '../../models'

interface ICategoriesSchema {
  categories: CategoryModel[]
}

//
// JUST AN EXAMPLE
//

const CategoriesSchema: React.FC<ICategoriesSchema> = ({ categories }) => {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'ItemList',
    name: 'Service Categories',
    itemListElement: categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ItemList',
        name: category.name,
        description: category.description,
        itemListElement: category.subCategories.map((subCategory, subIndex) => ({
          '@type': 'ItemList',
          position: subIndex + 1,
          item: {
            '@type': 'Service',
            name: subCategory.name,
            description: subCategory.description,
          },
        })),
      },
    })),
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  )
}

export { CategoriesSchema }
