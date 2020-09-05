import React, { Component, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import to from 'await-to-js';

import { FibContainer } from './FibContainer';

type Props = {};
type Values = Record<string, number>;
type Indicies = { number?: number }[];
interface State {
    seenIndicies: Indicies;
    values: Values;
    index: string;
    error: string;
}

export class Fib extends Component<Props, State> {
    state: Readonly<State> = {
        seenIndicies: [],
        values: {},
        index: '',
        error: '',
    };

    componentDidMount = () => {
        this.fetchValues();
        this.fetchIndicies();
    };

    fetchValues = async () => {
        const [err, vals] = await to(
            axios.get<Values>('/fib/v1/values/current')
        );

        if (err) {
            return;
        }

        this.setState({
            values: vals?.data ?? {},
        });
    };

    fetchIndicies = async (): Promise<void> => {
        const [err, res] = await to<AxiosResponse<Indicies>>(
            axios.get('/fib/v1/values/all')
        );
        if (err) {
            return;
        }

        if (!res?.data) {
            return;
        }

        return this.setState({
            ...this.state,
            seenIndicies: res?.data,
        });
    };

    renderValues = () => {
        return Object.entries(this.state.values).map(([key, value], i) => (
            <div style={{ display: 'flex', flexDirection: 'column' }} key={i}>
                <div>
                    <div>{`key is ${key} and value is ${value
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</div>
                </div>
                <br />
            </div>
        ));
    };

    renderIndicies = () => {
        const duplicationFree = Array.from(
            new Set(this.state.seenIndicies.map(index => index?.number))
        );
        return duplicationFree
            .sort((a, b) => {
                if (!a) {
                    return -1;
                }
                if (!b) {
                    return 1;
                }
                return a > b ? 1 : -1;
            })
            .map((val, i) => {
                const splitter = i + 1 !== duplicationFree.length ? ',' : '';

                return (
                    <div key={i}>
                        {val}
                        {splitter}
                    </div>
                );
            });
    };

    handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ index: e.target.value });
    };

    handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!this.state.index) {
            this.setState({ error: 'Please Enter a Number...' });
            return;
        }

        if (parseInt(this.state.index) < 0) {
            this.setState({ error: 'Please Enter a Number at least 0...' });
            return;
        }

        const limitation = 40;

        if (parseInt(this.state.index) > limitation) {
            this.setState({ error: `Number MUST be Under ${limitation}` });
            return;
        }

        this.setState({ error: '' });

        await axios.post('/fib/v1/values', {
            index: this.state.index,
        });

        this.setState({
            seenIndicies: [
                ...this.state.seenIndicies,
                { number: parseInt(this.state.index) },
            ],
            index: '',
        });

        setTimeout(async () => {
            await this.fetchValues();
        }, 2000);
    };

    render() {
        return (
            <FibContainer
                error={this.state.error}
                index={this.state.index}
                onChange={this.handleOnChange}
                onSubmit={this.handleOnSubmit}
                renderIndicies={this.renderIndicies}
                renderValues={this.renderValues}
            />
        );
    }
}
