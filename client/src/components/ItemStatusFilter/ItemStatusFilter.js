import React from 'react';
import { connect } from 'react-redux'
import { setFilterDone } from '../../redux/actions'

const ItemStatusFilter = ({show, loading, setFilterDone}) => {
  const classActive = 'btn btn-info';
  const classNonActive = 'btn btn-outline-secondary';
  const buttonList = [
    { label:'All', name: 'all', },
    { label:'Active', name: 'active', },
    { label:'Done', name: 'done', },
  ];

  const onFilter = (e) => {
    setFilterDone(e.target.name)
  }

  const buttons = buttonList.map((elem, index) => {
    return(
      <button
      disabled={loading}
        type="button"
        key={index}
        name={elem.name}
        className={show === elem.name? classActive : classNonActive}
        >{elem.label}</button>
    );
  });

  return (
    <div
      className="btn-group"
      onClick ={onFilter}>
      {buttons}
    </div>
  );
};



const mapStateToProps = state => ({
  show: state.filter.show,
  loading: state.todo.loading
})

const mapDispatchToProps = {
  setFilterDone
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatusFilter);