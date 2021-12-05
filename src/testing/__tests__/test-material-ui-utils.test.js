import { MenuItem, TextField } from "@material-ui/core";
import { extractInputFromTextField, extractSelectFromTextField } from "../test-material-ui-utils";
import { render, screen } from "../test-utils";


const ElementInput = () => {
    return (
        <TextField
            data-testid='testId'
            value='10' />
    );
};

const ElementSelect = () => {
    return (
        <TextField
            select
            data-testid='testId'
            value='0'>
            <MenuItem key='0' value='0'>Option 1</MenuItem>
            <MenuItem key='1' value='1'>Option 2</MenuItem>
        </TextField>
    );
};

describe('Test material ui extract methods', () => {
    it('test extract input from <TextField />', async () => {

        render(<ElementInput />);

        const element = screen.getByTestId('testId');

        const input = extractInputFromTextField(element);

        expect(input).toHaveAttribute('value', '10');
    });

    it('test extract select from <TextField />', async () => {

        render(<ElementSelect />);

        const element = screen.getByTestId('testId');

        const input = extractSelectFromTextField(element);

        expect(input).toHaveAttribute('value', '0');
    });
});