import React from 'react'
import { CategoryInfos} from "./CategoryFullInfos";
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'

const Category = () => {
  return (
    <section className={classes.Category_container}>
        {
            CategoryInfos.map((infos,i)=>(
                 <CategoryCard key={i} data={infos}/>

            ))
        }
      
    </section>
  )
}

export default Category
