import { formatBytes } from '@/shared/utils';
import { ScrollView, View } from 'react-native';
import { useModelDetailsContext } from '../../Context';
import { Icon, IconName, ThemeText, ThemeView } from '@funtools/native-ui/core';
import { Button, PressableView } from '@funtools/native-ui';
import { openLink } from '@/shared/utils/native';
import Clipboard from '@react-native-clipboard/clipboard';

export default function MainSection() {
  const { model } = useModelDetailsContext();
  return (
    <View className="flex-1 px-2 gap-8">
      <ThemeText color="text-secondary" className="text-sm font-semibold">
        {model.description}
      </ThemeText>

      <View className="gap-1 flex-row flex-wrap">
        {[
          {
            label: 'Size',
            value: formatBytes(model?.sizeBytes ?? 0),
            icon: 'Package',
          },
          { label: 'Ram', value: model?.ramRequirementGB, icon: 'Cpu' },
          { label: 'Params', value: model?.parameters, icon: 'Settings' },
          { label: 'Format', value: model?.quantization, icon: 'FileText' },
        ].map((item, index) => (
          <PressableView
            key={index}
            className="flex-1 flex-row items-center justify-between gap-3 p-2 rounded-lg basis-[120]"
          >
            <View className="flex-row gap-1 items-center">
              <Icon
                name={item.icon as IconName}
                size={12}
                color="text-secondary"
              />
              <ThemeText
                color="text-secondary"
                className="text-sm font-semibold"
              >
                {item.label}
              </ThemeText>
            </View>
            <ThemeText className="text-sm font-semibold">
              {item.value}
            </ThemeText>
          </PressableView>
        ))}
      </View>

      <View className="px-2 gap-2">
        <View className="flex-row items-center gap-2">
          <Icon name="Languages" size={16} />
          <ThemeText className="text-md font-bold">Languages</ThemeText>
        </View>

        <View className="flex-row flex-wrap items-center gap-2">
          {model?.languages.map((lang, index) => (
            <ThemeView
              key={index}
              color="bg-secondary"
              alpha={30}
              className="px-2 py-1 rounded-lg"
            >
              <ThemeText>{lang}</ThemeText>
            </ThemeView>
          ))}
        </View>
      </View>

      <View className="px-2 gap-2">
        <View className="flex-row items-center gap-2">
          <Icon name="MessageSquare" size={16} />
          <ThemeText className="text-md font-bold">Capabilities</ThemeText>
        </View>

        <View className="flex-row flex-wrap items-center gap-2">
          {model?.capabilities.map((capability, index) => (
            <ThemeView
              key={index}
              color="bg-secondary"
              alpha={30}
              className="px-2 py-1 rounded-lg"
            >
              <ThemeText>{capability}</ThemeText>
            </ThemeView>
          ))}
        </View>
      </View>

      <PressableView color="bg-secondary" className="p-2 rounded-lg gap-2">
        {[
          { label: 'Mobile Performance', value: model?.mobilePerformance },
          { label: 'Quality Output', value: model?.quality },
          { label: 'Context Length', value: model?.contextLength },
        ].map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between gap-2"
          >
            <ThemeText color="text-secondary" className="font-semibold">
              {item.label}
            </ThemeText>
            <ThemeText className="font-semibold capitalize">
              {item.value}
            </ThemeText>
          </View>
        ))}
      </PressableView>

      <View className="px-2 gap-2">
        <View className="flex-row items-center gap-2">
          <Icon name="Download" size={16} />
          <ThemeText className="text-md font-bold">Download Url</ThemeText>
        </View>

        <ThemeView
          color="bg-secondary"
          alpha={30}
          className="px-2 pr-1 py-1 rounded-lg flex-row item-center gap-2"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1"
          >
            <ThemeText color="text-secondary" className="text-nowrap">
              {model.downloadUrl}
            </ThemeText>
          </ScrollView>

          <Button
            title="Copy"
            startIcon="Clipboard"
            style={{ height: 20, borderRadius: 6 }}
            fontSize={12}
            onPress={(_, { handleState }) => {
              Clipboard.setString(model.downloadUrl);
              handleState('title', 'Copied!');
              handleState('startIcon', 'Check');
              setTimeout(() => {
                handleState('title', 'Copy');
                handleState('startIcon', 'Clipboard');
              }, 2000);
            }}
          />
        </ThemeView>

        <Button
          fontSize={14}
          color="info"
          startIcon="Globe"
          endIcon="ArrowRight"
          title="Open In Browser"
          style={{ height: 24, borderRadius: 8, alignSelf: 'flex-start' }}
          onPress={() => openLink(model.downloadUrl)}
        />
      </View>
    </View>
  );
}
