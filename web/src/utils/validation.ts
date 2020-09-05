import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';

const passwordValidationSchema = new passwordValidator();
const usernameValidationSchema = new passwordValidator();

type Dict = Record<
    'min' | 'max' | 'spaces' | 'uppercase' | 'lowercase' | 'digits',
    string
>;

const createDict = (
    field: string,
    min: number = 2,
    max: number = 30
): Dict => ({
    min: `${field} must be at least ${min} letters`,
    max: `${field} must be more then ${max} letters`,
    spaces: `${field} can't contain spaces`,
    uppercase: `${field} must contain uppercase letters`,
    lowercase: `${field} must contain lowercase letters`,
    digits: `${field} must contain digits letters`,
});

usernameValidationSchema.is().min(2).is().max(20).not().spaces();

passwordValidationSchema
    .is()
    .min(6)
    .is()
    .max(30)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .not()
    .spaces();

type ValidateResult = {
    errors: string[];
    cleanValue: string;
    isValid: boolean | string[];
};

type ValidateOptions = {
    field: 'email' | 'password' | 'username' | 'passwordAgain';
    value: string;
    validateValue?: string;
    required?: boolean;
};

export const validate = ({
    field,
    value,
    validateValue,
    required,
}: ValidateOptions): ValidateResult => {
    let errors: string[] = [];
    let isValid: boolean | string[] | null = null;
    let dict: Dict;

    const trimmed = value.trim();

    if (required && !value?.length) {
        return {
            isValid: false,
            errors: [`${field} is required`],
            cleanValue: trimmed,
        };
    }

    switch (field) {
        case 'username':
            const errArr = usernameValidationSchema.validate(trimmed, {
                list: true,
            }) as string[];

            isValid = !errArr.length ? true : false;

            dict = createDict(field);

            const translatedErrors = errArr.map(err => {
                if (err !== 'min' && err !== 'max' && err !== 'spaces') {
                    return;
                }

                return dict[err];
            }) as string[];

            errors = !isValid ? translatedErrors : [];
            break;
        case 'email':
            isValid = emailValidator.validate(trimmed);
            errors = !isValid ? [`${field} must be a valid email address`] : [];
            break;

        case 'password':
            const errArr2 = passwordValidationSchema.validate(trimmed, {
                list: true,
            }) as string[];

            dict = createDict('password', 8, 30);

            const translatedErrors2 = errArr2.map(err => {
                if (
                    err !== 'min' &&
                    err !== 'max' &&
                    err !== 'spaces' &&
                    err !== 'uppercase' &&
                    err !== 'lowercase' &&
                    err !== 'digits'
                ) {
                    return;
                }

                return dict[err];
            }) as string[];

            isValid = !errArr2.length ? true : false;
            errors = errArr2 && errArr2.length ? translatedErrors2 : [];
            break;

        case 'passwordAgain':
            if (!validateValue) {
                break;
            }
            isValid =
                passwordValidationSchema.validate(trimmed) &&
                trimmed === validateValue?.trim();
            break;
        default:
            throw new Error('unhandled field');
    }

    return {
        errors,
        cleanValue: trimmed,
        isValid: isValid !== null ? isValid : true,
    };
};
