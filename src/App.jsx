import './App.css'
import axios from 'axios'
import { useState} from 'react'


const api = {
  url:'https://api.github.com',
  client_id:'Iv1.93b7bda718deefff',
  client_secret:'aec4de579e7db91b7ff47c9265b921f8c1fb32ed'
}

function App() {

  const [data, setData] = useState([])
  const [itensPerPage, setItensPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(data.length / itensPerPage)

  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = data.slice(startIndex, endIndex)


const handleSearch = async(repositorio) =>{
  await axios.get(api.url+"/search/repositories?q="+repositorio+"&sort=stars").then((res) =>{
    console.log(res.data)
    setData(res.data.items)
    
  })
}
    console.log(data)

    return (
    <div className="container-app">
      <div className='container'>
    <header>

    </header>
    <main>
      <div className='form'>
        <center>
        <input type='text' placeholder='Digite o nome de um repositório' onChange={(e) => handleSearch(e.target.value)}/>
        </center>
      </div>
      <div className='content'>

        <table>
        <thead>
          <tr>
            <th>Nome do Repositório</th>
            <th>Descrição</th>
            <th>Autor</th>
            <th>Linguagem</th>
            <th>Stars</th>
            <th>Forks</th>
            <th>Data da última atualização</th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map(item => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.description.length < 50 ? item.description : item.description.slice(0,50)+"..."}</td>
                <td>{item.owner.login}</td>
                <td>{item.language}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.forks}</td>
                <td>{item.updated_at}</td>
              </tr>
            );
          })}
        </tbody>
        </table>
        {Array.from(Array(pages), (data, index) => {
      return <button value={index} onClick={(e) => setCurrentPage(e.target.value)}>{index+1}</button>
   })}

      </div>
    </main>
      </div>
    </div>
  )
}

export default App
