import { EmoteType, EmoteConfig } from '../../hooks/useEmote';
import { ZzzComponent } from './ZzzComponent';
import { SurpriseComponent } from './SurpriseComponent';
import { QuestionMarkComponent } from './QuestionMarkComponent';

interface EmoteComponentProps {
  emoteType: EmoteType;
  emoteConfig: EmoteConfig;
}

export function EmoteComponent({ emoteType, emoteConfig }: EmoteComponentProps) {
  if (!emoteConfig.showEmote) {
    return null;
  }
  
  // Render the appropriate emote based on type
  // The sleeping emote will be shown either when emoteType is 'sleep'
  // or when the expression animation is 'sleeping' (handled in useEmote hook)
  if (emoteConfig.zDelay !== undefined) {
    return <ZzzComponent showZzz={true} zDelay={emoteConfig.zDelay} />;
  }
  
  if (emoteType === 'surprise' && emoteConfig.surpriseDelay !== undefined) {
    return <SurpriseComponent showSurprise={true} surpriseDelay={emoteConfig.surpriseDelay} />;
  }

  if (emoteType === 'question' && emoteConfig.questionDelay !== undefined) {
    return <QuestionMarkComponent showQuestion={true} questionDelay={emoteConfig.questionDelay} />;
  }
  
  return null;
} 