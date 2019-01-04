import React, { Component } from 'react';

import { Main } from '@Components';
import {
    Spotlight,
    Categories,
    Recent,
    Filters,
    Products,
} from '@Containers';


export default class HomePage extends Component {
    render() {
        return (
            <Main title="RE-ART">
                <Spotlight />
                <Categories />
                <Recent />
                <Filters />
                <Products />
            </Main>
        );
    }
}
