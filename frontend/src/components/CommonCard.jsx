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
function CommonCard({title,description,content,footer,headerRightContent,extraTitleStyles}) {
  return (
    <Card>
        <CardHeader>
            <div >
                {title ? (
                    <CardTitle className={`text-2xl 
                    ${extraTitleStyles? extraTitleStyles:""}
                    `}>
                        {title}
                    </CardTitle>
                ): null}
                {headerRightContent ? headerRightContent : null}
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