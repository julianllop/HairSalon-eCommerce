const passwordREGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validate(form) {
    let errors = {};

    if (!form.password.trim()) {
        errors.password = "Password can't be empty";
    }
    if (!passwordREGEX.test(form.password.trim()) && form.password) {
        errors.password =
            "Password must contain 8 characters, 1 letter, 1 number, 1 special character";
    }

    /************************************************************************************ */

    if (!form.passwordX2.trim()) {
        errors.passwordX2 = "Password can't be empty";
    }

    if (form.passwordX2 !== form.password) {
        errors.passwordX2 = "Password doesn't match";
    }

    return errors;
}
