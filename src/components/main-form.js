import React, { Component, Fragment } from 'react'
import classname from 'classname'

import { upload } from '../helpers/upload'
import { isEmail } from '../helpers/email'

class MainForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            form: {
                files: [],
                to: '',
                from: '',
                message: ''
            }
        }
    }

    _onTextChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value

        this.setState((prevState) => {
            return { form: { ...prevState.form, [ name ]: value } }
        })
    }

    _onSubmit = (ev) => {
        ev.preventDefault()
        this._validate([ 'from', 'to', 'files' ], isValid => {
            if (isValid) {
                if (this.props.onUploadBegin) {
                    this.props.onUploadBegin(this.state.form)
                }

                upload(this.state.form, ev => {
                    if (this.props.onUploadEvent) {
                        this.props.onUploadEvent(ev)
                    }
                })
            }
        })
    }

    _onFileAdded = (ev) => {
        const files = this.state.form.files || []

        Array.prototype.slice.apply(ev.target.files).forEach(file => {
            files.push(file)
        })

        this.setState({
            form: {
                ...this.state.form,
                files
            }
        })
    }

    _removeFile = (key) => {
        let { files } = this.state.form

        files.splice(key, 1)

        this.setState({
            form: {
                ...this.state.form,
                files
            }
        })
    }



    _validate = (fields = [], cb = () => {}) => {
        const { form, errors } = this.state

        const validations = {
            from: [
                {
                    errorMessage: 'From value is required',
                    isValid: () => {
                        return form.from.length > 0
                    }
                },
                {
                    errorMessage: 'From value is not valid',
                    isValid: () => {
                        return isEmail(form.from)
                    }
                }
            ],
            to: [
                {
                    errorMessage: 'To value is required',
                    isValid: () => {
                        return form.to.length > 0
                    }
                },
                {
                    errorMessage: 'To value is not valid',
                    isValid: () => {
                        return isEmail(form.to)
                    }
                }
            ],
            files: [
                {
                    errorMessage: 'Don\'t have anything to upload',
                    isValid: () => {
                        return this.state.form.files.length > 0
                    }
                }
            ]
        }

        fields.forEach(field => {
            let fieldValidation = validations[ field ]

            errors[field] = null

            fieldValidation.forEach(validator => {
                if (errors[field]) return

                if (!validator.isValid()) {
                    errors[ field ] = validator.errorMessage
                }
            })
        })

        this.setState({
            errors
        }, () => {
            let isValid = true

            Object.entries(errors).forEach(([field,error]) => {
                if (error) {
                    isValid = isValid && false
                }
            })

            return cb(isValid)
        })
    }

    _renderFileList() {
        const { form } = this.state

        return (
            form.files.length > 0
            ? (<div className="files-selected">
                {
                    form.files.map((file, index) => {
                        return (
                            <div className="selected-item" key={Date.now() + index}>
                                <div className="filename">{file.name}</div>
                                <div className="file-action">
                                    <button
                                        onClick={(ev) => {
                                            ev.preventDefault()
                                            this._removeFile(index)
                                        }}
                                        className="file-remove">&times;</button>
                                </div>
                            </div>
                        )
                    })
                }
             </div>)
            : null
        )
    }

    _renderUploadZone() {
        return (
            <div className={
                classname(
                    "upload-zone",
                    {
                        error: this.state.errors.files
                    }
                )}>
                <label htmlFor="files">
                    <input
                        onChange={this._onFileAdded}
                        type="file" name="files" id="files" multiple={true}/>
                    {
                        this.state.form.files.length === 0
                        ? (
                            <Fragment>
                                <span className="upload-icon">
                                    <i className="icon-picture-streamline" />
                                </span>
                                <span className="upload-desc">
                                    Ziehen Sie Ihre Dateien hier hinein
                                </span>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <span className="upload-desc text-uppercase upload-more">
                                    Fügen Sie weitere Dateien hinzu
                                </span>
                            </Fragment>
                        )
                    }
                </label>
            </div>
        )
    }

    render() {
        const { form } = this.state

        return (
            <div className="card">
                <form encType="multipart/form-data" onSubmit={this._onSubmit}>
                    <div className="card-header">
                        <div className="card-header-inner">
                            { this._renderFileList() }
                            { this._renderUploadZone() }
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="card-content-inner">
                            <div className={classname(
                                "form-item",
                                {
                                    error: this.state.errors.to
                                }
                            )}>
                                <label htmlFor="send-to">Senden an</label>
                                <input
                                    value={form.to}
                                    onChange={this._onTextChange}
                                    placeholder={this.state.errors.to || "E-Mail-Adresse des Empfängers"}
                                    name="to" type="text" id="send-to"/>
                            </div>

                            <div className={classname(
                                "form-item",
                                {
                                    error: this.state.errors.from
                                }
                            )}>
                                <label htmlFor="from">Von</label>
                                <input
                                    value={form.from}
                                    onChange={this._onTextChange}
                                    placeholder={this.state.errors.from || "Ihre E-Mail-Adresse"} name="from" type="text" id="from"/>
                            </div>

                            <div className={"form-item"}>
                                <label htmlFor="message">Botschaft</label>
                                <textarea
                                    value={form.message}
                                    onChange={this._onTextChange}
                                    name="message" id="message"></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="button primary">Senden</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default MainForm
