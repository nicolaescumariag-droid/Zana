// Figma: 881:3507/881:3530 Create Account, 881:3721/881:3779 Check Email, 881:3797 Data Privacy,
// 881:3735 Name and Birth Date, 882:3372 Confirm Details, 881:12109 Main Goal
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { OnboardingSheet } from '@/components/composites/OnboardingSheet';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { CheckboxBox } from '@/components/primitives/Checkbox';
import { Text } from '@/components/primitives/Text';
import { TextField } from '@/components/primitives/TextField';
import { useAppState } from '@/state/AppState';
import { colors, palette, radius, spacing } from '@/tokens';

type Nav = { onBack: () => void; onNext: () => void };

function Heading({ title, body }: { title: string; body?: ReactNode }) {
  return (
    <View style={{ gap: spacing[4], marginBottom: spacing[8] }}>
      <Text variant="displayMD" color="#27272A" accessibilityRole="header">
        {title}
      </Text>
      {body ? (
        <Text variant="bodyMD" color="#27272A">
          {body}
        </Text>
      ) : null}
    </View>
  );
}

export function CreateAccountScreen({ onBack, onNext }: Nav) {
  const { user, setUser } = useAppState();
  const [email, setEmail] = useState('');
  return (
    <OnboardingSheet onBack={onBack}>
      <Heading title="Create an account" body="Store your results, track conditions, and get screening reminders for your age and life stage." />
      <View style={{ gap: spacing[3] }}>
        <TextField label="Email address" placeholder="Placeholder" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <Button label="Continue" onPress={() => { setUser({ email: email || user.email }); onNext(); }} />
      </View>
      <View style={styles.or}>
        <Asset name="line1" width={140} height={1} />
        <Text variant="labelMD" color={colors.textSecondary}>Or</Text>
        <Asset name="line2" width={140} height={1} />
      </View>
      {/* TODO(design): social sign-in and Log In are not part of the prototype — inert. */}
      <View style={{ gap: spacing[3] }}>
        <SocialButton icon="group" label="Continue with Apple" />
        <SocialButton icon="group74" label="Continue with Google" />
      </View>
      <Text variant="bodyMD" color={palette.dark[300]} align="center" style={{ marginTop: spacing[4] }}>
        Already have an account ? Log In
      </Text>
    </OnboardingSheet>
  );
}

function SocialButton({ icon, label }: { icon: 'group' | 'group74'; label: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} style={styles.social}>
      <Asset name={icon} width={20} />
      <Text color={colors.onActionPrimary}>{label}</Text>
    </Pressable>
  );
}

export function CheckEmailScreen({ onBack, onNext }: Nav) {
  const { user } = useAppState();
  const [code, setCode] = useState('');
  return (
    <OnboardingSheet onBack={onBack}>
      <Heading
        title="Check your email"
        body={
          <>
            We just sent a temporary identification code to <Text variant="bodyMD" style={{ fontFamily: 'DMSans_600SemiBold' }}>{user.email}</Text>
          </>
        }
      />
      <View style={{ gap: spacing[3] }}>
        <TextField label="Identification code" placeholder="Placeholder" value={code} onChangeText={setCode} keyboardType="number-pad" autoComplete="one-time-code" />
        <Text variant="labelMD" color={colors.textBody}>I did not receive the code. See options →</Text>
        <Button label="Continue" onPress={onNext} style={{ marginTop: spacing[1] }} />
      </View>
    </OnboardingSheet>
  );
}

const PRIVACY = [
  { title: 'Your Medical Records', body: 'Your documents are stored securely and never shared without your consent.', chip: 'Read our Privacy Policy', agree: 'Agree to our Privacy Policy' },
  { title: 'Your relationship with Zana', body: 'Our Terms of Use define how Zana works and how your data is protected.', chip: 'Read our Terms', agree: 'Agree to our Terms' },
  { title: 'Stay informed', body: 'Occasionally receive health tips and updates from Zana.', agree: 'Agree (Optional)' },
];

export function PrivacyScreen({ onClose, onNext }: { onClose: () => void; onNext: () => void }) {
  const [agreed, setAgreed] = useState<boolean[]>([false, false, false]);
  return (
    <OnboardingSheet onClose={onClose} footerContainer footer={<Button label="Next" icon="iconsArrowRight" onPress={onNext} />}>
      <View style={{ alignItems: 'center', gap: spacing[6] }}>
        <Asset name="shield61" width={166} />
        <Text variant="displayLG" color="#27272A" accessibilityRole="header" style={{ alignSelf: 'stretch' }}>
          We take your health data seriously.
        </Text>
        {PRIVACY.map((p, i) => (
          <View key={p.title} style={{ alignSelf: 'stretch', gap: spacing[3] }}>
            <Text variant="bodyLGBold" color="#27272A">{p.title}</Text>
            <Text color="#27272A">{p.body}</Text>
            {/* TODO(design): policy documents not provided — chips are inert. */}
            {p.chip ? (
              <View style={styles.policyChip}>
                <Text variant="labelMD" color={palette.dark[600]}>{p.chip}</Text>
              </View>
            ) : null}
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreed[i] }}
              onPress={() => setAgreed((a) => a.map((v, j) => (j === i ? !v : v)))}
              style={styles.agree}
            >
              <CheckboxBox checked={agreed[i]} />
              <Text color={colors.textDisplay}>{p.agree}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </OnboardingSheet>
  );
}

export function NameScreen({ onBack, onNext }: Nav) {
  const { user, setUser } = useAppState();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  return (
    <OnboardingSheet onBack={onBack} progress={1} footerContainer footer={<Button label="Next" icon="iconsArrowRight" onPress={() => { setUser({ firstName: name || user.firstName, age: ageFrom(dob) ?? user.age }); onNext(); }} />}>
      <Heading title="Perfect! Now let's set up your profile." body="What should we call you?" />
      <View style={{ gap: spacing[8] }}>
        <TextField label="First name" placeholder="Sophie" value={name} onChangeText={setName} autoComplete="given-name" />
        <TextField label="Birth date" placeholder="Jan 6, 2022" value={dob} onChangeText={setDob} trailingIcon="iconsCalendar" />
      </View>
    </OnboardingSheet>
  );
}

export function ConfirmScreen({ onBack, onNext }: Nav) {
  const { user } = useAppState();
  return (
    <OnboardingSheet
      onBack={onBack}
      progress={1}
      footer={
        <>
          <Button label="Confirm" icon="iconsArrowRight" onPress={onNext} />
          <Pressable accessibilityRole="button" onPress={onBack} style={{ alignSelf: 'center', padding: 4 }}>
            <Text color={colors.textBody}>Edit details</Text>
          </Pressable>
        </>
      }
    >
      <Heading title={`Is this right, ${user.firstName}?`} body="Check your details before we continue." />
      <View style={styles.detailsCard}>
        <View style={[styles.detailRow, { borderBottomWidth: 1, borderBottomColor: palette.neutral[400] }]}>
          <Text variant="labelLG" color="#1D1D1D">FIRST NAME</Text>
          <Text variant="bodyMD" color={colors.textBody}>{user.firstName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text variant="labelLG" color="#1D1D1D">AGE</Text>
          <Text variant="bodyMD" color={colors.textBody}>{`${user.age} years old`}</Text>
        </View>
      </View>
      <Text variant="bodyMD" color={colors.textSecondary} style={{ marginTop: spacing[6] }}>
        We use your age to show the screenings you need right now.
      </Text>
    </OnboardingSheet>
  );
}

const GOALS = ['Stay on top of screenings', 'Keep my records organised', 'Understand my medical results', 'Prepare for doctor visits', 'Track my health over time', 'Other'];

export function GoalScreen({ onBack, onNext }: Nav) {
  const [picked, setPicked] = useState<string[]>([]);
  return (
    <OnboardingSheet onBack={onBack} progress={1} footerContainer footer={<Button label="Next" icon="iconsArrowRight" onPress={onNext} />}>
      <Heading title="What would you like Zana to help you with?" body="Choose what is your main goal" />
      <View style={{ gap: spacing[3] }}>
        {GOALS.map((g) => {
          const on = picked.includes(g);
          return (
            <Pressable
              key={g}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              onPress={() => setPicked((p) => (on ? p.filter((x) => x !== g) : [...p, g]))}
              style={styles.goal}
            >
              <CheckboxBox checked={on} />
              <Text variant="bodyMD" color={colors.textBody} style={{ flex: 1 }}>{g}</Text>
              <Asset name="group2" width={18} height={16} />
            </Pressable>
          );
        })}
      </View>
    </OnboardingSheet>
  );
}

const styles = StyleSheet.create({
  or: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing[8] },
  social: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[3], minHeight: 48, borderRadius: radius.small, backgroundColor: colors.actionPrimary },
  policyChip: { alignSelf: 'flex-start', borderWidth: 1, borderColor: palette.dark[600], borderRadius: 24, paddingHorizontal: spacing[3], paddingVertical: spacing[2] },
  agree: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[3], borderRadius: radius.small, backgroundColor: palette.neutral[400], minHeight: 48 },
  detailsCard: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small },
  detailRow: { padding: spacing[3], gap: spacing[1] },
  goal: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingHorizontal: spacing[4], paddingVertical: spacing[1], minHeight: 52, borderRadius: radius.medium, borderWidth: 1, borderColor: palette.neutral[600], backgroundColor: palette.neutral[100] },
});

// Accepts DD/MM/YYYY (Irish format), YYYY-MM-DD, or a month-name date like "Jan 6, 1990"; parsed in local time.
function parseBirthDate(dob: string): Date | undefined {
  const v = dob.trim();
  let m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (m) return validDate(+m[3], +m[2] - 1, +m[1]);
  m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return validDate(+m[1], +m[2] - 1, +m[3]);
  if (!/[a-z]/i.test(v)) return undefined;
  const t = Date.parse(v);
  return Number.isNaN(t) ? undefined : new Date(t);
}

function validDate(y: number, mo: number, d: number): Date | undefined {
  const date = new Date(y, mo, d);
  return date.getFullYear() === y && date.getMonth() === mo && date.getDate() === d ? date : undefined;
}

function ageFrom(dob: string): number | undefined {
  const d = parseBirthDate(dob);
  if (!d) return undefined;
  const now = new Date();
  const age = now.getFullYear() - d.getFullYear() - (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);
  return age >= 0 && age < 130 ? age : undefined;
}
