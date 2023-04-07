import React from 'react'
import { useRouter } from 'next/router'
import { useEffect , useState } from 'react'
import { api } from '~/utils/api'

function UrlPath() {
  const queries = useRouter();
//   console.log(queries.query.)
  const {data } = api.example.getShortUrl.useQuery({
       shortUrl:queries.query.urlPath
  })

  useEffect(() => {
        if(!data){
            // return <div>I cant find this pokemon</div>
        }else {
            window.location.href = data.longUrl;
        }
  } , [data?.longUrl])
  return (
    <div>
        Redireted to {data?.longUrl}

    </div>
  )
}

export default UrlPath