import React, { useState, useEffect } from 'react'
import {Loader, Card, FormField} from '../components'

const POST_URL = 'http://localhost:8080/api/v1/post'


const RenderCards = ({ data, title }) => {
  if (data?.length > 0)  {
    return data.map((post) => <Card key={post.id} {...post} />)
  } 

  return (
    <h2 className='mt-5 font-bold text-x1 uppercase'>
      {title}
    </h2>
  )
}
 
export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(false)
  const [searchText, setSearchText] = useState()
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)
  
  const getAllPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(POST_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const posts = await response.json()
        //Using reverse in order to show the latest posts first
        setAllPosts(posts.data.reverse())
      }
       
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }
  
  const handleSearchOnChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
        setTimeout(() => {
        const searchResults = allPosts.filter((post) => post.name?.toLowerCase().includes(searchText.toLowerCase()) || 
        post.prompt.toLowerCase().includes(searchText.toLowerCase()))

        setSearchedResults(searchResults)
      }, 700)
    )
  }

  useEffect(() => {
    getAllPosts()
  }, [])
  

  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Las busquedas de la comunidad</h1>
        <p className='mt-2 text-[#666e75] text-[18px] max-w[500px]'>
          Mira las imagenes mas sorprendentes creadas con inteligencia artificial
        </p>
      </div>
      <div className='mt-16'>
        <FormField 
          labelName='Buscar posts'
          name='text'
          placeholder='Buscá entre los posts'
          value={searchText}
          handleChange={handleSearchOnChange}
         />
      </div>
      <div className='mt-10'>
        {loading ? (
            <div className='flex justify-center items-center'>
              <Loader/>
            </div>
            ) : (
              <>
              {searchText && 
                  (<h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    Mostrando resultados para <span className='text-[#222328]'>{searchText}</span>
                  </h2>
              )}
              <div className='
                grid 
                lg:grid-cols-4
                sm:grid-cols-3
                xs:grid-cols-2
                grid-cols-1
                gap 3 '>
                  {searchText ? ( 
                    <RenderCards
                      data={searchedResults}
                      title="No se encontraron resultados de la busqueda"
                    />
                    ) : 
                    <RenderCards
                      data={allPosts}
                      title="No hay posts"
                    />
                        }
              </div>
              </>)
          }
      </div>
    </section>
  )
}

export default Home