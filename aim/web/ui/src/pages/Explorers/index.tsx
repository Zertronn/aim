import React from 'react';

import { Box, Separator, Text } from 'components/kit_v2';

import { PathEnum } from 'config/enums/routesEnum';

import { getItem } from 'utils/storage';

import { ExplorersContainer } from './Explorers.style';
import useExplorers from './useExplorers';
import ExplorerCard from './components/ExplorerCard';
import Bookmarks from './Bookmarks/Bookmarks';

/**
 * Explorers page
 * @returns {React.FunctionComponentElement<React.ReactNode>}
 */
function Explorers(): React.FunctionComponentElement<React.ReactNode> {
  const { explorers, isLoading } = useExplorers();
  function getPathFromStorage(route: PathEnum): PathEnum | string {
    const path = getItem(`${route.split('/')[2]}Url`) ?? '';
    if (path !== '' && path.startsWith(route)) {
      return path;
    }
    return route;
  }

  return (
    <Box display='flex'>
      <Box
        height='100vh'
        css={{ overflow: 'auto' }}
        display='flex'
        fd='column'
        p='$5 $13 $13'
      >
        <Text size='$9' as='h1' weight='$3'>
          Explorers
        </Text>
        <Box display='flex' fd='column'>
          <Box>
            <Text css={{ mt: '$12', mb: '$5' }} weight='$3' as='h3' size='$6'>
              Prompt engineering
            </Text>
            <Text color='#45484D'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </Text>
            <ExplorersContainer>
              {Object.values(explorers.promptExplorers).map(
                (item, index: number) => (
                  <ExplorerCard
                    {...item}
                    isLoading={isLoading}
                    path={getPathFromStorage(item.path as PathEnum) as PathEnum}
                    key={index}
                  />
                ),
              )}
            </ExplorersContainer>
          </Box>
          <Box>
            <Text css={{ mt: '$12', mb: '$5' }} weight='$3' as='h3' size='$6'>
              Experiment tracking
            </Text>
            <Text color='#45484D'>
              Explorers will help you to compare 1000s of AI experiments with a
              few clicks. Explorers are the main tools that Aim is built around.
            </Text>
            <ExplorersContainer>
              {Object.values(explorers.aimExplorers).map(
                (item, index: number) => (
                  <ExplorerCard
                    {...item}
                    isLoading={isLoading}
                    path={getPathFromStorage(item.path as PathEnum) as PathEnum}
                    key={index}
                  />
                ),
              )}
            </ExplorersContainer>
          </Box>
        </Box>
      </Box>
      <Separator orientation='vertical' />
      <Bookmarks />
    </Box>
  );
}

export default Explorers;
