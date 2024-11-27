import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../Clientes/Components/Conex/UserContext';
import { Header } from '../Components/Productsycarro/Header';
import './Profile.css'
function ProfileVen() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div className="container">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a className="list-group-item list-group-item-action active" href="#general">
                  General
                </a>
                <a className="list-group-item list-group-item-action" href="#password">
                  Cambiar Contraseña
                </a>
                <a className="list-group-item list-group-item-action" href="#social-links">
                  Mis Productos
                </a>
                <a className="list-group-item list-group-item-action" href="#notifications">
                  Notificaciones
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div id="general" className="tab-pane fade active show">
                  <div className="card-body media align-items-center">
                    <img
                      src={user?.photo || 'https://bootdey.com/img/Content/avatar/avatar1.png'}
                      alt="User Avatar"
                      className="d-block ui-w-80"
                    />
                    <div className="media-body ml-4">
                      <label className="btn btn-outline-primary">
                        Upload new photo
                        <input type="file" className="account-settings-fileinput" />
                      </label>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                     <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div id="password" className="tab-pane fade">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                </div>
                <div id="social-links" className="tab-pane fade">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Twitter</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user?.social?.twitter || ''}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Facebook</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user?.social?.facebook || ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div id="notifications" className="tab-pane fade">
                  <div className="card-body">
                    <h6 className="mb-4">Activity</h6>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" checked />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label">
                          Email me when someone comments on my post
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-3">
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
          <button type="button" className="btn btn-default">
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfileVen;
