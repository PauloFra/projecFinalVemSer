import { useEffect, useState } from "react";

import "../../components/globalStyles/global.modules.css";
import ModalList from "../../components/modal/ModalList";
import moment from "moment";
import api from "../../api";
import Loading from "../../components/loading/Loading";
import { VagasDTO } from "../../model/VagasDTO";
function Vagas() {
  
  const [visibleModal, setVisibleModal] = useState(false);
  const [vagas, setVagas] = useState<any>();
  console.log(visibleModal);
  
  async function getInVagas() {
    try{
      const {data} = await api.get('/vaga/get-vagas-compleo')
      setVagas(data)
    }
    catch(error){
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getInVagas()
  },[])
  if(!vagas){
    return(<Loading />)
  }
  return (
    <div className="divContainerTable">
      {visibleModal && <ModalList onClose={() => setVisibleModal(false)} />}
      <table className="tableDefault">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Responsavel</th>
            <th>estado</th>
            <th>data_abertura</th>
            <th>cidade</th>
            <th>analista</th>
            <th>pcd</th>
            <th className="centerTd">Vincular Candidato</th>
          </tr>
        </thead>
        <tbody>
          {vagas.map((vaga:any) => (
            <tr key={vaga.id_vaga}>
              <td>{vaga.titulo}</td>
              <td>{vaga.cliente}</td>
              <td>{vaga.status}</td>
              <td>{vaga.responsavel}</td>
              <td>{vaga.estado}</td>
              <td>{moment(vaga.dataAbertura , 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
              <td>{vaga.cidade}</td>
              <td>{vaga.analista}</td>
              <td>{vaga.pcd ? "Sim" : "Não"}</td>
              <td className="centerTd">
                <button onClick={() => setVisibleModal(true)}>Vincular</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vagas;
