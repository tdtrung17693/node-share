import React, { Component } from 'react'
import classname from 'classname'
import { isEmail } from '../helpers/email'
import { createUser } from '../helpers/users'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: true,
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: {
                name: null,
                email: null,
                password: null,
                confirmPassword: null
            }
        }
    }

    onSubmit = ev => {
        ev.preventDefault()
        const { isLogin } = this.state

        let fields = []

        if (isLogin) {
            fields = ['email', 'password']
        } else {
            fields = ['name', 'email', 'password', 'confirmPassword']
        }

        this.formValidation(fields, isValid => {
            if (!isValid) return

            if (!this.state.isLogin) {
                this.signUp()
            }
        })
    }

    signIn() {}

    signUp() {
        createUser(this.state.user)
                    .then(console.log)
    }

    onTextFieldChange = ev => {
        let { user } = this.state

        const fieldName = ev.target.name
        const fieldValue = ev.target.value

        user = { ...user, [fieldName]: fieldValue}
        console.log(user)
        this.setState({ user })
    }

    toggleSignIn = ev => {
        ev.preventDefault()
        const { isLogin } = this.state

        this.setState({
            isLogin: !isLogin
        })
    }

    formValidation(fieldsToValidate = [], cb = () => {}) {
        const { user } = this.state

        const allFields = {
            name: {
                message: "Your name is required.",
                validate: () => {
                    const value = user.name

                    if(value.length > 0){
                        return true;
                    }

                    return false;
                }
            },

            email: {
                message: "Email is not correct",
                validate: () => {
                    const value = user.email

                    if(value.length > 0 && isEmail(value)){
                        return true;
                    }
                    return false;
                }
            },

            password: {
                message: "Password shoud has more than 3 characters.",
                validate: () => {
                    const value = user.password

                    if(value && value.length > 3){
                        return true;
                    }

                    return false;
                }
            },

            confirmPassword: {
                message: "Password does not match.",
                validate: () => {
                    const confirmValue = user.confirmPassword
                    const value = user.password

                    if(confirmValue !== "" && confirmValue === value){
                        return true;
                    }

                    return false;
                }
            }
        }

        let { error } = this.state

        fieldsToValidate.forEach(field => {
            error[field] = !allFields[field].validate()
        })

        const isValid = (Object.entries(error)).reduce((r, entry) => {
            if (fieldsToValidate.indexOf(entry[0]) >= 0) {
                return r && entry[1]
            }

            return r
        }, true)

        this.setState({ error: { ...error } })
        cb(isValid)
    }

    render() {
        const { isLogin, error } = this.state
        const title = isLogin ? "Anmelden" : "Registrieren"
        const text = isLogin ? "Haben Sie kein Konto" : "Haben Sie ein Konto"
        const buttonText = isLogin ? "Anmelden" : "Registrieren"
        const alternativeButtonText = isLogin ? "Registrieren" : "Anmelden"

        return (
            <div className="app-login-form">
                <button
                    onClick={this.props.closeForm}
                    className="dismiss-button">&times;</button>
                <div className="app-login-form-inner">
                    <h2 className="form-title">{title}</h2>
                    <form onSubmit={this.onSubmit}>
                        {
                            !isLogin ?
                                (
                                    <div className={classname("form-item", {error: error.name})}>
                                        <label htmlFor="name">Name</label>
                                        <input value={this.state.user.name} onChange={this.onTextFieldChange} type="text" id="name" name="name" />
                                    </div>
                                ) : null
                        }
                        <div className={classname("form-item", {error: error.email})}>
                            <label htmlFor="email">E-mail</label>
                            <input value={this.state.user.email} onChange={this.onTextFieldChange} type="email" id="email" name="email" />
                        </div>
                        <div className={classname("form-item", {error: error.password})}>
                            <label htmlFor="password">Kennwort</label>
                            <input value={this.state.user.password} onChange={this.onTextFieldChange} type="password" id="password" name="password" />
                        </div>
                        {
                            !isLogin ?
                                (
                                    <div className={classname("form-item", {error: error.confirmPassword})}>
                                        <label htmlFor="confirmPassword">Bestätigungskennwort</label>
                                        <input value={this.state.user.confirmPassword} onChange={this.onTextFieldChange} type="password" id="confirmPassword" name="confirmPassword" />
                                    </div>
                                ) : null
                        }

                        <div className="form-actions">
                            <button className="button primary">{buttonText}</button>
                            <div className="form-description">{text}</div>
                            <button className="button" onClick={this.toggleSignIn}>{alternativeButtonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;