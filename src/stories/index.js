// @flow
import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import '../injectGlobal'
// import type { } from '../types'

storiesOf('Hello', module).add('simple', () => <button onClick={action} />)
