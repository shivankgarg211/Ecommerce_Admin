import React from 'react'


function Statusupdate() {
  return (
    <div>
      <Toggle
                    id={`status-toggle-${item.uid}`}
                    name="status"
                    defaultChecked={item.status === "active"}
                   
                  />
    </div>
  )
}

export default Statusupdate

