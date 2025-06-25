import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
function CommonCard({title,description,content,footer,headerRightContent,extraTitleStyles,rightContenStyles}) {
  return (
    <Card className='mb-2 shadow-xl rounded-xl'>
        <CardHeader>
            <div className='flex items-center justify-between'>
                {title ? (
                    <CardTitle className={`text-2xl 
                    ${extraTitleStyles? extraTitleStyles:""}
                    `}>
                        {title}
                    </CardTitle>
                ): null}
                <h2 className={`${rightContenStyles? rightContenStyles:""}`}>{headerRightContent ? headerRightContent : null}</h2>
            </div>
             <div>
                {description ? (
                    <CardTitle>
                        {description}
                    </CardTitle>
                ): null}
            </div>
        </CardHeader>
        {content ? (
        <CardContent>
            {content}
        </CardContent>)
        : null}
        <CardFooter>
            {footer}
        </CardFooter>
    </Card>
  )
}

export default CommonCard